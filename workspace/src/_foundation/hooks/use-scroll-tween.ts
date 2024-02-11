import { gsap } from 'gsap';
import { ref, readonly, useEvent } from 'lake';
import NormalizeWheel from 'normalize-wheel';
import { useTick } from '~/_foundation/hooks';
import { lerp } from '~/_foundation/math';
import { useMediaQuery } from '~/_states/mq';
import { useWindowSize } from '~/_states/window-size';

const EASE = {
  pc: 0.1,
  sp: 0.09,
} as const;

export const useScrollTween = () => {
  const mq = useMediaQuery();

  const posY = ref(0);
  const diff = ref(0);

  const state = {
    dragging: false,
    maxY: 0,
    position: 0,
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

  const [, , { isResizing }] = useWindowSize();

  useTick(({ timeRatio }) => {
    if (isResizing.value) {
      return;
    }

    const oldY = posY.value;
    const p = 1 - (1 - EASE[mq.value]) ** timeRatio;
    const easeVal = lerp(posY.value, state.targetPos, p);

    posY.value = easeVal;
    diff.value = oldY - posY.value;
  });

  const onTouchmove = (e: TouchEvent) => {
    if (!state.dragging) {
      return;
    }

    const y = e.touches[0].clientY;
    const distance = (state.startPos - y) * 2;
    state.targetPos = state.position + distance;

    return state.targetPos;
  };

  const onWheel = (e: WheelEvent) => {
    const { pixelY } = NormalizeWheel(e);
    state.targetPos += pixelY;

    return state.targetPos;
  };

  return {
    diff: readonly(diff),
    onTouchmove,
    onWheel,
    posY: readonly(posY),
    resize: (maxY: number) => {
      state.maxY = maxY;
    },
    wrap: (cy: number) => gsap.utils.wrap(0, state.maxY, cy),
  };
};
