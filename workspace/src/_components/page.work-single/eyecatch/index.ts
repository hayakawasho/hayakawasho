import { defineComponent, useMount } from "lake";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import { useTick } from "@/_foundation/hooks";
import { Plane } from "./plane";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "eyecatch",
  setup(el: HTMLElement, context: AppContext) {
    const { frontCanvasContext, history: _, scrollContext } = context;

    const state = {
      resizing: false,
    };

    const { device } = useMediaQueryContext();

    const [windowWidth, windowHeight] = useWindowSizeContext(payload => {
      state.resizing = true;
      plane.updateCache({ offset: scrollContext.scrollTop() });
      plane.resize(payload);
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }
      plane.updateY(scrollContext.scrollTop());
    });

    const plane = new Plane(el, {
      currentY: scrollContext.scrollTop(),
      windowHeight: windowHeight.value,
      windowWidth: windowWidth.value,
      device,
    });

    useMount(() => {
      frontCanvasContext.addScene(plane);

      return () => {
        frontCanvasContext.removeScene(plane);
      };
    });
  },
});
