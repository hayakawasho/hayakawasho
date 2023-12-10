import { gsap } from 'gsap';
import { ref, readonly, useEvent } from 'lake';
import NormalizeWheel from 'normalize-wheel';
import { useTick } from '@/_foundation/hooks';
import { lerp } from '@/_foundation/math';

export const useScrollTween = (ease: number) => {
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
    'touchstart',
    e => {
      state.dragging = true;
      state.position = posY.value;
      state.startPos = e.touches[0].clientY;
    },
    {
      passive: true,
    }
  );

  useEvent(window as any, 'touchend', () => {
    if (state.dragging) {
      state.dragging = false;
    }
  });

  useTick(({ timeRatio }) => {
    if (state.resizing) {
      return;
    }

    const oldY = posY.value;
    const p = 1 - (1 - ease) ** timeRatio;
    const easeVal = lerp(posY.value, state.targetPos, p);

    posY.value = easeVal;
    diff.value = oldY - posY.value;
  });

  return {
    diff: readonly(diff),
    onTouchmove: (e: TouchEvent) => {
      if (!state.dragging) {
        return;
      }

      const y = e.touches[0].clientY;
      const distance = (state.startPos - y) * 2;
      state.targetPos = state.position + distance;

      return state.targetPos;
    },
    onWheel: (e: WheelEvent) => {
      const { pixelY } = NormalizeWheel(e);
      state.targetPos += pixelY;

      return state.targetPos;
    },
    posY: readonly(posY),
    resize: (maxY: number) => {
      state.resizing = true;
      state.maxY = maxY;
      state.resizing = false;
    },
    wrap: (cy: number) => {
      return gsap.utils.wrap(0, state.maxY, cy);
    },
  };
};
