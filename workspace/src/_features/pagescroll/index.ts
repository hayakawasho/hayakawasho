import { useNativeScrollTween } from "./use-native-scroll-tween";
import { useVScrollTween } from "./use-vscroll-tween";
import { useWindowEvent } from "../../_hooks/use-window-event";
import { scrollStateYMutators } from "../../_stores/scroll";

export const usePageScroll = (el: HTMLElement, anyHover: boolean) => {
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
