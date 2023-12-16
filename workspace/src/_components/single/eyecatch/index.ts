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
      pc: imgSrc + IMAGIX_API + '&w=1440',
      sp: imgSrc + IMAGIX_API + '&w=750',
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
      u_innerX: {
        value: 0,
      },
      u_innerY: {
        value: map(currentY.value, offsetY.value, endY.value, -0.2, 0.1),
      },
      u_mesh_size: {
        value: new Vector2(bounds.width, bounds.height),
      },
      u_opacity: {
        value: 1,
      },
      u_scale: {
        value: map(currentY.value, offsetY.value, endY.value, 1.2, 1),
      },
      u_screen_center_exture: {
        value: 0,
      },
      u_size: {
        value: new Vector2(1, 1),
      },
      u_texture: {
        value: texture,
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

      const { top, height } = el.getBoundingClientRect();
      const offset = -wh + top;
      offsetY.value = offset;
      endY.value = offset + wh + height;

      isResizing.value = false;
    });

    useScrollPosY(({ currentY, oldY }) => {
      if (isResizing.value || currentY === oldY) {
        return;
      }

      plane.updateY(currentY);

      uniforms.u_innerY.value = map(currentY, offsetY.value, endY.value, -0.2, 0.1);
      uniforms.u_scale.value = map(currentY, offsetY.value, endY.value, 1.2, 1);
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
