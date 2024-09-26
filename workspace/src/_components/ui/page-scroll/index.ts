import { defineComponent, useSlot } from "lake";
import { useRoute } from "~/_states/route";
import { usePageScroll } from "./use-page-scroll";

export default defineComponent({
  name: "PageScroll",
  setup(el: HTMLElement, { anyHover }: { anyHover: boolean }) {
    const { removeChild: _removeChild } = useSlot();

    const scrollContext = usePageScroll({
      el,
      anyHover,
    });

    useRoute(({ name }) => {
      switch (name) {
        case "home":
        case "work":
        case "error":
          scrollContext.pause();
          break;
        default:
          scrollContext.resume();
          break;
      }
    });

    return scrollContext;
  },
});
