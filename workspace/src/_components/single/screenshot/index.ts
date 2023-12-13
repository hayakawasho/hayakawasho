import { defineComponent, useMount, ref } from 'lake';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from '@/_foundation/three';
// import { Tween } from '@/_foundation/tween';
import { map } from '@/_foundation/math';
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
      pc: src + '?auto=compress,format',
      sp: src + '?auto=compress,format&w=750',
    };

    const isResizing = ref(false);

    const texture = loader.load(texSrc[mq.value], texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    const [ww, wh] = useWindowSize();

    const bounds = el.getBoundingClientRect();
    const offset = -wh.value + bounds.top;
    const offsetY = ref(offset);
    const endY = ref(offset + bounds.height);

    const uniforms = {
      u_image_size: {
        value: new Vector2(Number(el.dataset.w), Number(el.dataset.h)),
      },
      u_mesh_size: {
        value: new Vector2(bounds.width, bounds.height),
      },
      u_texture: {
        value: texture,
      },
      u_opacity: {
        value: 1,
      },
      u_progress: {
        value: 0,
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
      endY.value = offset + bounds.height + wh * 0.1;

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
