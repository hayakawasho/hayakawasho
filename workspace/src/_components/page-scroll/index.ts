import { useMount, useEvent, defineComponent } from "lake";
import VirtualScroll from "virtual-scroll";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { useWindowSizeContext } from "@/_states/window-size";
import { Smooth } from "./smooth";

export default defineComponent({
  name: "PageScroll",
  setup(content: HTMLElement) {
    const smooth = new Smooth();

    const vs = new VirtualScroll({
      firefoxMultiplier: 20,
      mouseMultiplier: 0.375,
      passive: false,
      preventTouch: true,
      touchMultiplier: 2,
      useKeyboard: false,
      useTouch: true,
    });

    const [_, windowHeight] = useWindowSizeContext();

    useElementSize(content, ({ height }) => {
      smooth.updateHeight(height, windowHeight.value);
    });

    vs.on(smooth.onVScroll);

    useEvent(window as any, "scroll", smooth.onNativeScroll, {
      passive: true,
    });

    useTick(payload => {
      smooth.tick(payload);
    });

    useMount(() => {
      smooth.resume();

      return () => {
        vs.off(smooth.onVScroll);
        vs.destroy();
        smooth.destroy();
      };
    });

    return {
      pause: smooth.pause,
      reset: smooth.reset,
      resume: smooth.resume,
      scrollTop: smooth.scrollTop,
    };
  },
});
