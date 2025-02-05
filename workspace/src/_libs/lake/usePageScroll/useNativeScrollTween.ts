import { gsap } from "gsap";
import { useMount } from "lake";
import globalStore from "../../../_stores";
import { useWindowScroll } from "../../../_stores/window-scroll";
import { useElementSize } from "../useElementSize";
import { useTick } from "../useTick";
import { useWindowEvent } from "../useWindowEvent";
import { Smoother } from "./smoother";

export const useNativeScrollTween = (el: HTMLElement) => {
  const smooth = new Smoother({
    stiffness: 0.3,
    damping: 1.2,
    mass: 1.14,
  });

  useElementSize(el, ({ height }) => {
    smooth.resize(height, globalStore.bounds.wh);
  });

  useWindowEvent("scroll", smooth.onNativeScroll, {
    passive: true,
  });

  useWindowEvent("wheel", smooth.onWheel, {
    passive: false,
  });

  useTick(smooth.raf);

  const [_, setScrollPos] = useWindowScroll();

  useMount(() => {
    const scrollTo = (val: number) => {
      gsap.to(window, {
        duration: 0,
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
