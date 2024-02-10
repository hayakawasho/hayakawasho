import { defineComponent, useMount, useUnmount } from 'lake';
// import { useMediaQuery } from '~/_states/mq';
import { useScrollPosY } from '~/_states/scroll';
import { useWindowSize } from '~/_states/window-size';
import { Plane } from './plane';
import type { AppContext } from '~/_foundation/type';

export default defineComponent({
  name: 'eyecatch',
  setup(el: HTMLElement, context: AppContext) {
    const { frontCanvasContext, history: _ } = context;

    // const mq = useMediaQuery();

    const [ww, wh] = useWindowSize(({ width, height }) => {
      plane.resize({
        height,
        width,
      });
    });

    const [currentY] = useScrollPosY(({ currentY, oldY }) => {
      currentY !== oldY && plane.updateY(currentY);
    });

    const plane = new Plane(el, {
      currentY: currentY.value,
      windowSize: {
        height: wh.value,
        width: ww.value,
      },
    });

    useMount(() => {
      frontCanvasContext.addScene(plane);
    });

    useUnmount(() => {
      frontCanvasContext.removeScene(plane);
    });
  },
});
