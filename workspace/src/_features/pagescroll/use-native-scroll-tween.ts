import { gsap } from "gsap";
import { useMount } from "lake";
import { Smoother } from "./smoother";
import { useElementSize } from "../../_hooks/use-element-size";
import { useTick } from "../../_hooks/use-tick";
import { useWindowEvent } from "../../_hooks/use-window-event";
import globalStore from "../../_stores";
import { useWindowScroll } from "../../_stores/window-scroll";

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
