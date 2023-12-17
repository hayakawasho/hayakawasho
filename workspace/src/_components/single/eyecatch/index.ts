import { defineComponent, useMount, useUnmount, ref } from 'lake';
import { IMAGIX_API } from '@/_foundation/const';
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

    const imgSrc = el.dataset.src!;
    const texSrc = {
      pc: imgSrc + IMAGIX_API + '&w=1440',
      sp: imgSrc + IMAGIX_API + '&w=750',
    };

    const plane = new Plane(el);

    const [ww, wh] = useWindowSize(({ ww, wh }) => {
      plane.resize(ww, wh);
    });

    const [currentY] = useScrollPosY(({ currentY, oldY }) => {
      if (currentY === oldY) {
        return;
      }
      plane.updateY(currentY);
    });

    useMount(() => {
      plane.init(texSrc[mq.value], ww.value, wh.value, currentY.value);

      frontCanvasContext.addScene(plane);
    });

    useUnmount(() => {
      frontCanvasContext.removeScene(plane);
    });
  },
});
