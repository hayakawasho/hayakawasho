import { gsap } from "gsap";
import { useDomRef, useMount } from "lake";
import globalStore from "../../../_stores";
import { useWindowScroll } from "../../../_stores/window-scroll";
import { useElementSize } from "../useElementSize";
import { useTick } from "../useTick";
import { useWindowEvent } from "../useWindowEvent";
import { Smoother } from "./smoother";

type Refs = {
  scrollTarget: HTMLElement;
};

export const useVScrollTween = (el: HTMLElement) => {
  const { refs } = useDomRef<Refs>("scrollTarget");

  const smooth = new Smoother({
    stiffness: 0.2,
    damping: 1.6,
    mass: 1,
  });

  useElementSize(el, ({ height }) => {
    smooth.resize(height, globalStore.bounds.wh);
  });

  useWindowEvent("touchstart", smooth.onTouchstart, {
    passive: true,
  });

  useWindowEvent("touchend", smooth.onTouchend);

  useWindowEvent("touchmove", smooth.onTouchmove, {
    passive: true,
  });

  useWindowEvent("wheel", smooth.onWheel, {
    passive: false,
  });

  useTick(smooth.raf);

  const [_, setScrollPos] = useWindowScroll();

  useMount(() => {
    const scrollTo = (val: number) => {
      gsap.to(refs.scrollTarget, {
        duration: 0,
        y: -val,
        scrollTo: {
          y: val,
          autoKill: true,
        },
      });
    };

    const onSmooth = ({ currentY = 0 }) => {
      scrollTo(currentY);
      setScrollPos(currentY);
    };

    smooth.on(onSmooth);
    smooth.set(globalStore.offsetY);
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
