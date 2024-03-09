import { defineComponent, useMount, useUnmount } from "lake";
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollPosYContext } from "@/_states/scroll";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "eyecatch",
  setup(el: HTMLElement, context: AppContext) {
    const { frontCanvasContext, history: _ } = context;

    const mq = useMediaQueryContext();

    const [ww, wh] = useWindowSizeContext(({ width, height }) => {
      plane.resize({
        height,
        width,
      });
    });

    const [currentY] = useScrollPosYContext(({ currentY, oldY }) => {
      currentY !== oldY && plane.updateY(currentY);
    });

    const plane = new Plane(el, {
      currentY: currentY.value,
      windowSize: {
        height: wh.value,
        width: ww.value,
      },
      mq: mq.value,
    });

    useMount(() => {
      frontCanvasContext.addScene(plane);
    });

    useUnmount(() => {
      frontCanvasContext.removeScene(plane);
    });
  },
});
