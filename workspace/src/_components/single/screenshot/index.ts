import { defineComponent, useMount, ref } from 'lake';
import { IMAGIX_API } from '@/_foundation/const';
import { map } from '@/_foundation/math';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from '@/_foundation/three';
// import { Tween } from '@/_foundation/tween';
import { ImagePlane } from '@/_glsl';
import { useScrollPosY } from '@/_states/scroll';
import { useWindowSize } from '@/_states/window-size';
import fragment from './fragment.frag';
import vertex from './vertex.vert';
import type { AppContext } from '@/_foundation/type';

const loader = new TextureLoader();
loader.crossOrigin = 'anonymous';

export default defineComponent({
  name: 'Screenshot',
  setup(el: HTMLImageElement, context: AppContext) {
    const { frontCanvasContext, mq, history } = context;

    const src = el.dataset.src!;
    const texSrc = {
      pc: src + IMAGIX_API + '&w=1200',
      sp: src + IMAGIX_API + '&w=750',
    };

    const isResizing = ref(false);

    const texture = loader.load(texSrc[mq.value], texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    const [ww, wh] = useWindowSize();

    const BOTTOM_MARGIN = {
      pc: wh.value * 0.25,
      sp: wh.value * 0.15,
    };

    const bounds = el.getBoundingClientRect();
    const offset = -wh.value + bounds.top;
    const offsetY = ref(offset);
    const endY = ref(offset + bounds.height + BOTTOM_MARGIN[mq.value]);

    const uniforms = {
      u_depth: {
        value: {
          pc: 120,
          sp: 30,
        }[mq.value],
      },
      u_image_size: {
        value: new Vector2(Number(el.dataset.w), Number(el.dataset.h)),
      },
      u_mesh_size: {
        value: new Vector2(bounds.width, bounds.height),
      },
      u_opacity: {
        value: 1,
      },
      u_progress: {
        value: 0,
      },
      u_texture: {
        value: texture,
      },
    };

    const geometry = new PlaneBufferGeometry(1, 1, 4, 20);
    const material = new ShaderMaterial({
      fragmentShader: fragment,
      uniforms,
      vertexShader: vertex,
    });

    const mesh = new Mesh(geometry, material);
    const plane = new ImagePlane(mesh, el);

    useWindowSize(({ ww, wh }) => {
      isResizing.value = true;

      plane.resize(ww, wh);

      const bounds = el.getBoundingClientRect();
      const offset = -wh + bounds.top;
      offsetY.value = offset;
      endY.value = offset + bounds.height + BOTTOM_MARGIN[mq.value];

      isResizing.value = false;
    });

    useScrollPosY(({ currentY, oldY }) => {
      if (isResizing.value || currentY === oldY) {
        return;
      }

      plane.updateY(currentY);

      const progress = map(currentY, offsetY.value, endY.value, 0, 1.5);
      uniforms.u_progress.value = progress;
    });

    useMount(() => {
      plane.resize(ww.value, wh.value);
      frontCanvasContext.addScene(mesh);

      return () => {
        if (history.value === 'pop') {
          frontCanvasContext.removeScene(mesh);
          return;
        }

        frontCanvasContext.removeScene(mesh);
      };
    });
  },
});
