import { defineComponent } from "lake";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useNativeScrollTween } from "./use-native-scroll-tween";
import { useVScrollTween } from "./use-vscroll-tween";

{
  gsap.registerPlugin(ScrollToPlugin);
}

export default defineComponent({
  name: "PageScroll",
  setup(el: HTMLElement, { anyHover }: { anyHover: boolean }) {
    const scrollContext = anyHover ? useNativeScrollTween(el) : useVScrollTween(el);

    return {
      ...scrollContext,
    };
  },
});
