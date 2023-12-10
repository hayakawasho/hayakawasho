import { getGPUTier } from 'detect-gpu';
import { defineComponent, useDomRef, ref } from 'lake';
import { useTick } from '@/_foundation/hooks';
import { useWindowSize } from '@/_states/window-size';
import { useGl } from './use-gl';

type Refs = {
  front: HTMLCanvasElement;
  back: HTMLCanvasElement;
};

export default defineComponent({
  name: 'GlWorld',
  setup(_el) {
    const { refs } = useDomRef<Refs>('front', 'back');

    const isResizing = ref(false);

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const glFront = useGl(refs.front, dpr);
    const glBack = useGl(refs.back, 1);

    getGPUTier().then(result => {
      if (result.tier === 1) {
        glFront.setPixelRatio(1);
      }
    });

    useWindowSize(({ aspect, wh, ww }) => {
      isResizing.value = true;
      glFront.resize(ww, wh, aspect);
      glBack.resize(ww, wh, aspect);
      isResizing.value = false;
    });

    useTick(() => {
      if (isResizing.value) {
        return;
      }

      glFront.render();
      glBack.render();
    });

    return {
      glBack: {
        addScene: glBack.addScene,
        removeScene: glBack.removeScene,
      },
      glFront: {
        addScene: glFront.addScene,
        removeScene: glFront.removeScene,
      },
    };
  },
});
