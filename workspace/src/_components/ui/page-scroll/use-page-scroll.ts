import { useWindowEvent } from "~/_foundation/hooks";
import { scrollStateYMutators } from "~/_states/scroll";
import { useNativeScrollTween } from "./use-native-scroll-tween";
import { useVScrollTween } from "./use-vscroll-tween";

export const usePageScroll = ({ el, anyHover }: { el: HTMLElement; anyHover: boolean }) => {
  let timer = 0;

  useWindowEvent(
    "scroll",
    () => {
      clearTimeout(timer);

      scrollStateYMutators({ scrolling: true });

      timer = window.setTimeout(() => {
        scrollStateYMutators({ scrolling: false });
      }, 500);
    },
    {
      passive: true,
    },
  );

  const scrollContext = anyHover ? useNativeScrollTween(el) : useVScrollTween(el);
  return scrollContext;
};
