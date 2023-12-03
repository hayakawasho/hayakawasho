import { defineComponent, useMount, useIntersectionWatch } from 'lake';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from '@/_foundation/three';
import { Tween } from '@/_foundation/tween';
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
    const { glContext, mq, history } = context;

    const src = el.dataset.src!;
    const state = {
      src: {
        pc: src + '?auto=compress,format',
        sp: src + '?auto=compress,format&w=750',
      },
      resizing: false,
      visible: false,
    };

    const texture = loader.load(state.src[mq.value], texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    const { width, height } = el.getBoundingClientRect();

    const uniforms = {
      u_alpha: {
        value: 1.0,
      },
      u_image_size: {
        value: new Vector2(Number(el.dataset.w), Number(el.dataset.h)),
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

    useIntersectionWatch(
      el,
      ([entry]) => {
        state.visible = entry.isIntersecting;
      },
      {
        rootMargin: '25%',
      }
    );

    const [ww, wh] = useWindowSize(({ ww, wh }) => {
      state.resizing = true;
      plane.resize(ww, wh);
      state.resizing = false;
    });

    useScrollPosY(({ currentY, oldY }) => {
      if (state.resizing || !state.visible || currentY === oldY) {
        return;
      }

      plane.updateY(currentY);
    });

    useMount(() => {
      plane.resize(ww.value, wh.value);
      glContext.addScene(mesh);

      return () => {
        if (history.value === 'pop') {
          glContext.removeScene(mesh);

          return;
        }

        Tween.tween(uniforms.u_alpha, 0.55, 'power3.inOut', {
          onComplete: () => {
            glContext.removeScene(mesh);
          },
          value: 0,
        });
      };
    });
  },
});
