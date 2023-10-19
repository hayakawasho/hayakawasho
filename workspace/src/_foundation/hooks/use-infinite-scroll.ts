import { gsap } from "gsap";
import { ref, readonly, useEvent, useMount } from "lake";
import NormalizeWheel from "normalize-wheel";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { useWindowSize } from "@/_states/window-size";

export const useInfiniteScroll = (container: HTMLElement, mq: "pc" | "sp") => {
  const posY = ref(0);
  const diff = ref(0);

  const state = {
    dragging: false,
    maxY: 0,
    position: 0,
    resizing: false,
    startPos: 0,
    targetPos: 0,
  };

  useEvent(
    window as any,
    "wheel",
    (e) => {
      const { pixelY } = NormalizeWheel(e);
      state.targetPos += pixelY;
    },
    {
      passive: true,
    }
  );

  useEvent(
    window as any,
    "touchstart",
    (e) => {
      state.dragging = true;
      state.position = posY.value;
      state.startPos = e.touches[0].clientY;
    },
    {
      passive: true,
    }
  );

  useEvent(window as any, "touchend", () => {
    if (state.dragging) {
      state.dragging = false;
    }
  });

  useEvent(
    window as any,
    "touchmove",
    (e) => {
      if (!state.dragging) {
        return;
      }

      const y = e.touches[0].clientY;
      const distance = (state.startPos - y) * 2;
      state.targetPos = state.position + distance;
    },
    {
      passive: true,
    }
  );

  const onResize = () => {
    state.resizing = true;
    state.maxY = container.getBoundingClientRect().height * 0.5;
    state.resizing = false;
  };

  useWindowSize(() => {
    onResize();
  });

  const EASE = {
    pc: 0.08,
    sp: 0.09,
  } as const;

  useTick(({ timeRatio }) => {
    if (state.resizing) {
      return;
    }

    const oldY = posY.value;
    const p = 1 - (1 - EASE[mq]) ** timeRatio;
    const easeVal = lerp(posY.value, state.targetPos, p);

    posY.value = easeVal;
    diff.value = oldY - posY.value;
  });

  useMount(() => {
    onResize();
  });

  return {
    diff: readonly(diff),
    onResize,
    posY: readonly(posY),
    wrap: (cy: number) => {
      return gsap.utils.wrap(0, state.maxY, cy);
    },
  };
};
