import { defineComponent, useMount, useDomRef } from 'lake';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from 'three';
import { useTick } from '@/_foundation/hooks';
import { Tween } from '@/_foundation/tween';
import { ImagePlane } from '@/_glsl';
import { useWindowSize } from '@/_states/window-size';
import fragment from './fragment.frag';
import vertex from './vertex.vert';
// import fragment from "./cylinder.frag";
// import vertex from "./cylinder.vert";
import type { useInfiniteScroll } from '@/_foundation/hooks';
import type { AppContext } from '@/_foundation/type';

type Props = AppContext & {
  infiniteScrollContext: ReturnType<typeof useInfiniteScroll>;
};

const IMG_API = '?auto=compress,format';

const loader = new TextureLoader();
loader.crossOrigin = 'anonymous';

export default defineComponent({
  name: 'GridItem',
  setup(el: HTMLElement, context: Props) {
    const { glContext, mq, infiniteScrollContext, history } = context;
    const { diff, posY } = infiniteScrollContext;

    const { refs } = useDomRef<{ plane: HTMLImageElement }>('plane');

    const imgSrc = refs.plane.dataset.src!;
    const speed = Number(refs.plane.dataset.speed);

    const state = {
      pc: {
        speed,
        src: imgSrc + IMG_API + '&w=1440',
      },
      resizing: false,
      sp: {
        speed,
        src: imgSrc + IMG_API + '&w=750',
      },
    };

    const texture = loader.load(state[mq.value].src, texture => {
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
    const imagePlane = new ImagePlane(mesh, el);

    const [ww, wh] = useWindowSize(({ ww, wh }) => {
      state.resizing = true;
      imagePlane.onResize(ww, wh);
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }

      const y = infiniteScrollContext.wrap(posY.value * state[mq.value].speed);

      imagePlane.updatePos(y);
      uniforms.u_velo.value = diff.value * 0.005 * state[mq.value].speed;
    });

    useMount(() => {
      imagePlane.onResize(ww.value, wh.value);
      glContext.addScene(mesh);

      return () => {
        if (history.value === 'pop') {
          glContext.removeScene(mesh);
          return;
        }

        Tween.serial(
          Tween.wait(0.8, () => {
            glContext.removeScene(mesh);
          })
        );
      };
    });
  },
});
