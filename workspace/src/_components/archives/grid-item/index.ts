import { defineComponent, useMount, useDomRef, ref } from 'lake';
import { useTick } from '@/_foundation/hooks';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from '@/_foundation/three';
import { ImagePlane } from '@/_glsl';
import { useWindowSize } from '@/_states/window-size';
import fragment from './fragment.frag';
import vertex from './vertex.vert';
import type { useInfiniteScroll } from '@/_foundation/hooks';
import type { AppContext } from '@/_foundation/type';

type Props = AppContext & {
  infiniteScrollContext: ReturnType<typeof useInfiniteScroll>;
};

type Refs = {
  plane: HTMLImageElement;
  link: HTMLAnchorElement;
};

const IMG_API = '?auto=compress,format';

const loader = new TextureLoader();
loader.crossOrigin = 'anonymous';

export default defineComponent({
  name: 'GridItem',
  setup(el: HTMLElement, context: Props) {
    const { glContext, mq, infiniteScrollContext } = context;

    const gl = glContext.glFront;
    const { diff, posY } = infiniteScrollContext;

    const { refs } = useDomRef<Refs>('plane', 'link');

    const isResizing = ref(false);

    const imgSrc = refs.plane.dataset.src as string;
    const texSrc = {
      pc: imgSrc + IMG_API + '&w=1440&sat=-100',
      sp: imgSrc + IMG_API + '&w=750&sat=-100',
    };

    const SPEED = Number(refs.plane.dataset.speed);

    const texture = loader.load(texSrc[mq.value], texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    const { width, height } = refs.plane.getBoundingClientRect();

    const uniforms = {
      u_alpha: {
        value: 1,
      },
      u_image_size: {
        value: new Vector2(Number(refs.plane.dataset.w), Number(refs.plane.dataset.h)),
      },
      u_mesh_size: {
        value: new Vector2(width, height),
      },
      u_scale: {
        value: 1.0,
      },
      u_texture: {
        value: texture,
      },
      u_velo: {
        value: 0,
      },
    };

    const geometry = new PlaneBufferGeometry(1, 1);
    const material = new ShaderMaterial({
      fragmentShader: fragment,
      uniforms,
      vertexShader: vertex,
    });

    const mesh = new Mesh(geometry, material);
    const plane = new ImagePlane(mesh, el);

    const [ww, wh] = useWindowSize(({ ww, wh }) => {
      isResizing.value = true;
      plane.resize(ww, wh);
      isResizing.value = false;
    });

    useTick(() => {
      if (isResizing.value) {
        return;
      }

      const y = infiniteScrollContext.wrap(posY.value * SPEED);
      plane.updateY(y);
      refs.link.style.transform = `translateY(${-y}px) translateZ(0)`;

      uniforms.u_velo.value = diff.value * 0.005 * SPEED;
    });

    useMount(() => {
      plane.resize(ww.value, wh.value);
      gl.addScene(mesh);

      return () => {
        gl.removeScene(mesh);
      };
    });
  },
});
