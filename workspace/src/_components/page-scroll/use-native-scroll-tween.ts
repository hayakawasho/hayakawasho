import { useMount, useEvent } from "lake";
import { gsap } from "gsap";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { useWindowSizeContext } from "@/_states/window-size";
import { scrollPositionMutators } from "@/_states/scroll-position";
import { Smooth } from "./smooth";

export const useNativeScrollTween = (scrollArea: HTMLElement) => {
  const smooth = new Smooth({
    stiffness: 0.3,
    damping: 1.2,
    mass: 1.14,
  });

  const [_, wh] = useWindowSizeContext();

  useElementSize(scrollArea, ({ height: contentH }) => {
    smooth.onResize(contentH, wh.value);
  });

  useEvent(window as any, "scroll", smooth.onNativeScroll, {
    passive: true,
  });

  useEvent(window as any, "wheel", smooth.onWheel, {
    passive: false,
  });

  useTick(({ deltaRatio }) => {
    smooth.raf({ deltaRatio });
  });

  useMount(() => {
    const onSmooth = ({ currentY = 0 }) => {
      gsap.to(window, {
        duration: 0,
        scrollTo: {
          y: currentY,
          autoKill: true,
        },
      });
      scrollPositionMutators(currentY);
    };
    smooth.on(onSmooth);
    smooth.set(window.scrollY);
    smooth.resume();

    return () => {
      smooth.pause();
      smooth.off(onSmooth);
    };
  });

  return {
    ...smooth,
  };
};
