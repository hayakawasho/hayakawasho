import { defineComponent, useMount, useUnmount } from 'lake';
import { Plane } from './plane';
import { useMediaQuery } from '@/_states/mq';
import { useScrollPosY } from '@/_states/scroll';
import { useWindowSize } from '@/_states/window-size';
import type { AppContext } from '@/_foundation/type';

export default defineComponent({
  name: 'eyecatch',
  setup(el: HTMLElement, context: AppContext) {
    const { frontCanvasContext, history } = context;

    const mq = useMediaQuery();

    const [ww, wh] = useWindowSize(({ ww, wh }) => {
      plane.resize(ww, wh);
    });

    const [currentY] = useScrollPosY(({ currentY, oldY }) => {
      currentY !== oldY && plane.updateY(currentY);
    });

    const plane = new Plane(el, {
      ww: ww.value,
      wh: wh.value,
      currentY: currentY.value,
    });

    useMount(() => {
      frontCanvasContext.addScene(plane);
    });

    useUnmount(() => {
      frontCanvasContext.removeScene(plane);
    });
  },
});
