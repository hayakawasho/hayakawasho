import { defineComponent, useMount, ref } from 'lake';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from '@/_foundation/three';
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
  name: 'eyecatch',
  setup(el: HTMLElement, context: AppContext) {
    const { frontCanvasContext, mq, history } = context;

    const isResizing = ref(false);

    const imgSrc = el.dataset.src!;
    const texSrc = {
      pc: imgSrc + '?auto=compress,format',
      sp: imgSrc + '?auto=compress,format&w=750',
    };

    const texture = loader.load(texSrc[mq.value], texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    const [ww, wh] = useWindowSize();

    const bounds = el.getBoundingClientRect();
    const offset = -wh.value + bounds.top;
    const offsetY = ref(offset);
    const endY = ref(offset + wh.value + bounds.height);

    const [currentY] = useScrollPosY();

    const uniforms = {
      u_image_size: {
        value: new Vector2(Number(el.dataset.w), Number(el.dataset.h)),
      },
      u_mesh_size: {
        value: new Vector2(bounds.width, bounds.height),
      },
      u_innerScale: {
        value: map(currentY.value, offsetY.value, endY.value, 1.2, 1),
      },
      u_innerY: {
        value: map(currentY.value, offsetY.value, endY.value, -0.2, 0.1),
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
      u_innerX: {
        value: 0,
      },
      u_screenCenterTexture: {
        value: 0,
      },
      u_size: {
        value: [1, 1],
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

    useWindowSize(({ ww, wh }) => {
      isResizing.value = true;

      plane.resize(ww, wh);

      const bounds = el.getBoundingClientRect();
      const offset = -wh + bounds.top;
      offsetY.value = offset;
      endY.value = offset + wh + bounds.height;

      isResizing.value = false;
    });

    useScrollPosY(({ currentY, oldY }) => {
      if (isResizing.value || currentY === oldY) {
        return;
      }

      plane.updateY(currentY);

      const innerY = map(currentY, offsetY.value, endY.value, -0.2, 0.1);
      const innerScale = map(currentY, offsetY.value, endY.value, 1.2, 1);

      uniforms.u_innerY.value = innerY;
      uniforms.u_innerScale.value = innerScale;
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
