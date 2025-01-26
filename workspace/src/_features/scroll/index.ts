import { useNativeScrollTween } from "./useNativeScrollTween";
import { useVScrollTween } from "./useVScrollTween";
import { useWindowEvent } from "../../_libs/lake/useWindowEvent";
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
