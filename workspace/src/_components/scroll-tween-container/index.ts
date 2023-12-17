import { defineComponent, ref, useMount, useEvent } from 'lake';
import NormalizeWheel from 'normalize-wheel';
import { clamp } from 'remeda';
import { useTick } from '@/_foundation/hooks';
import { useScrollTween } from '@/_foundation/hooks/use-scroll-tween';
import { lerp } from '@/_foundation/math';
import { Tween } from '@/_foundation/tween';
import { qsa } from '@/_foundation/utils';
import { useMediaQuery } from '@/_states/mq';
import { scrollPosYMutators } from '@/_states/scroll';
import { useWindowSize } from '@/_states/window-size';
import { useHandleCache } from './use-handle-cache';
import type { Cache } from './use-handle-cache';

const SELECTOR_CLASS = '[data-scroll-item]';

export default defineComponent({
  name: 'ScrollTweenContainer',
  setup(el) {
    const elItems = qsa<HTMLElement>(SELECTOR_CLASS, el);

    if (!elItems.length) {
      throw new Error(`NO ${SELECTOR_CLASS}`);
    }

    const refContainer = ref(el);

    const mq = useMediaQuery();

    const EASE = {
      pc: 0.1,
      sp: 0.09,
    } as const;

    const scrollTweenContext = useScrollTween();

    const state = {
      active: false,
      currentPos: 0,
      dragging: false,
      position: 0,
      scrollLimit: 0,
      startPos: 0,
      targetPos: 0,
    };

    const { createCache, updateCache } = useHandleCache();
    const cache = ref(createCache(elItems));

    const [_, wh, { isResizing }] = useWindowSize();

    const setScrollLimit = () => {
      const { height } = refContainer.value.getBoundingClientRect();
      return height >= wh.value ? height - wh.value : height;
    };

    const isVisible = (cache: Cache) => {
      const extra = cache.parent?.transform ?? 0;
      const translate = state.currentPos * cache.speed;
      const transform = translate - cache.offset - extra;
      const start = cache.top - translate;
      const end = cache.bottom - translate;

      const THRESHOLD = 150;
      const isVisible = start < THRESHOLD + wh.value && end > -THRESHOLD;

      return {
        isVisible,
        transform,
      };
    };

    const transformElms = (cache: Cache[]) => {
      cache.forEach(item => {
        const { isVisible: visibleOr, transform } = isVisible(item);

        if (visibleOr || isResizing.value || !item.out) {
          item.out = item.out ? true : false;
          item.transform = transform;
          item.el.style.transform = `translateY(${-transform}px) translateZ(0)`;
        }
      });
    };

    useEvent(
      window as any,
      'touchstart',
      e => {
        if (!state.active) {
          return;
        }

        state.dragging = true;
        state.position = state.currentPos;
        state.startPos = e.touches[0].clientY;
      },
      {
        passive: true,
      }
    );

    useEvent(window as any, 'touchend', () => {
      if (!state.dragging || !state.active) {
        state.dragging = false;
      }
    });

    useEvent(
      window as any,
      'touchmove',
      e => {
        if (!state.dragging || !state.active) {
          return;
        }

        const y = e.touches[0].clientY;
        const distance = (state.startPos - y) * 2;

        state.targetPos = clamp(state.position + distance, {
          max: state.scrollLimit,
          min: -0,
        });
      },
      {
        passive: true,
      }
    );

    useEvent(
      window as any,
      'wheel',
      e => {
        if (!state.active) {
          return;
        }

        const { pixelY } = NormalizeWheel(e);
        state.targetPos += pixelY;
        state.targetPos = clamp(state.targetPos, { max: state.scrollLimit, min: -0 });
      },
      {
        passive: true,
      }
    );

    useWindowSize(() => {
      cache.value = updateCache(cache.value);
      state.scrollLimit = setScrollLimit();

      state.targetPos = clamp(state.targetPos, {
        max: state.scrollLimit,
        min: -0,
      });
    });

    useTick(({ timeRatio }) => {
      if (!state.active || !state.scrollLimit) {
        return;
      }

      const p = 1 - (1 - EASE[mq.value]) ** timeRatio;
      const easeVal = lerp(state.currentPos, state.targetPos, p);
      state.currentPos = easeVal;

      if (state.currentPos < 0.01) {
        state.currentPos = 0;
      }

      scrollPosYMutators(state.currentPos);
      transformElms(cache.value);
    });

    //----------------------------------------------------------------

    const resume = () => {
      state.active = true;
    };

    const pause = () => {
      state.active = false;
    };

    const reInit = (container: HTMLElement) => {
      const $item = qsa<HTMLElement>(SELECTOR_CLASS, container);

      if (!$item.length) {
        throw new Error(`NO ${SELECTOR_CLASS}`);
      }

      refContainer.value = container;
      cache.value = createCache($item);
      state.scrollLimit = setScrollLimit();
    };

    const scrollTo = (y: number) => {
      Tween.tween(state, 0.8, 'power2.inOut', {
        targetPos: clamp(y, {
          max: state.scrollLimit,
        }),
      });
    };

    const set = (value: number) => {
      state.targetPos = value;
      state.currentPos = value;
    };

    //----------------------------------------------------------------

    useMount(() => {
      resume();
    });

    return {
      pause,
      reInit,
      resume,
      scrollTo,
      set,
    };
  },
});
