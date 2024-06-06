import { useMount, useEvent, useDomRef } from "lake";
import { gsap } from "gsap";
import { useTick, useElementSize } from "~/_foundation/hooks";
import { useWindowSizeContext } from "~/_states/window-size";
import { scrollPositionMutators } from "@/_states/scroll-position";
import { Smooth } from "./smooth";

type Refs = {
  scrollTarget: HTMLElement;
};

export const useVScrollTween = (scrollArea: HTMLElement) => {
  const { refs } = useDomRef<Refs>("scrollTarget");

  const smooth = new Smooth({
    stiffness: 0.2,
    damping: 1.6,
    mass: 1,
  });

  const [_, wh] = useWindowSizeContext();

  useElementSize(scrollArea, ({ height: contentH }) => {
    smooth.onResize(contentH, wh.value);
  });

  useEvent(window as any, "touchstart", smooth.onTouchstart, {
    passive: true,
  });

  useEvent(window as any, "touchend", smooth.onTouchend);

  useEvent(window as any, "touchmove", smooth.onTouchmove, {
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
      gsap.to(refs.scrollTarget, {
        duration: 0,
        y: -currentY,
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
