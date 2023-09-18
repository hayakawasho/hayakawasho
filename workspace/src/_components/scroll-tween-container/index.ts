import { defineComponent, ref, useEvent, useMount } from "lake";
import NormalizeWheel from "normalize-wheel";
import { clamp } from "remeda";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { scrollPosMutators } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import { useHandleCache } from "./use-handle-cache";
import type { Cache } from "./use-handle-cache";
import type { AppContext } from "@/_foundation/type";

const SELECTOR_CLASS = "[data-scroll-item]";

export default defineComponent({
  name: "scrollTweenContainer",
  setup(el, { env }: Pick<AppContext, "env">) {
    const smoothItem = Array.from(
      el.querySelectorAll<HTMLElement>(SELECTOR_CLASS)
    );

    if (!smoothItem.length) {
      throw new Error(`NO ${SELECTOR_CLASS}`);
    }

    const state = {
      active: false,
      container: el,
      currentPos: 0,
      dragging: false,
      position: 0,
      resizing: false,
      scrollLimit: 0,
      startPos: 0,
      targetPos: 0,
    };

    const { createCache, updateCache } = useHandleCache();
    const cache = ref(createCache(smoothItem));

    const [_ww, wh] = useWindowSize();

    const setScrollLimit = () => {
      const { height } = state.container.getBoundingClientRect();
      return height >= wh.value ? height - wh.value : height;
    };

    const clampTarget = (target: number) => {
      return clamp(target, {
        max: state.scrollLimit,
        min: -0,
      });
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
      cache.forEach((item) => {
        const { isVisible: visibleOr, transform } = isVisible(item);

        if (visibleOr || state.resizing || !item.out) {
          item.out = item.out ? true : false;
          item.transform = transform;
          item.el.style.transform = `translateY(${-transform}px) translateZ(0)`;
        }
      });
    };

    useEvent(
      window as any,
      "touchstart",
      (e) => {
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

    useEvent(window as any, "touchend", () => {
      if (!state.dragging || !state.active) {
        return;
      }
      state.dragging = false;
    });

    useEvent(
      window as any,
      "touchmove",
      (e) => {
        if (!state.dragging || !state.active) {
          return;
        }

        const y = e.touches[0].clientY;
        const distance = (state.startPos - y) * 2;
        state.targetPos = clampTarget(state.position + distance);
      },
      {
        passive: true,
      }
    );

    useEvent(
      window as any,
      "wheel",
      (e) => {
        if (!state.active) {
          return;
        }

        const normalizeWheel = NormalizeWheel(e);
        state.targetPos += normalizeWheel.pixelY;
        state.targetPos = clampTarget(state.targetPos);
      },
      {
        passive: true,
      }
    );

    useWindowSize(() => {
      state.resizing = true;
      cache.value = updateCache(cache.value);
      state.scrollLimit = setScrollLimit();
      state.targetPos = clampTarget(state.targetPos);
      state.resizing = false;
    });

    const t = {
      pc: 1 - 0.15,
      sp: 1 - 0.1,
    } as const;

    useTick(({ timeRatio }) => {
      if (!state.active || !state.scrollLimit) {
        return;
      }

      const EASE = 1 - t[env.mq] ** timeRatio;
      const easeVal = lerp(state.currentPos, state.targetPos, EASE);
      state.currentPos = easeVal;

      if (state.currentPos < 0.01) {
        state.currentPos = 0;
      }

      scrollPosMutators({
        y: state.currentPos,
      });
      transformElms(cache.value);
    });

    useMount(() => {
      state.active = true;
    });

    return {
      pause: () => {
        state.active = false;
      },
      reInit: (container: HTMLElement) => {
        const smoothItem = Array.from(
          container.querySelectorAll<HTMLElement>(SELECTOR_CLASS)
        );
        state.container = container;
        cache.value = createCache(smoothItem);
        state.scrollLimit = setScrollLimit();
      },
      resume: () => {
        state.active = true;
      },
      scrollTo: (y: number) => {
        const value = clamp(y, {
          max: state.scrollLimit,
        });
        Tween.tween(state, 0.8, "power2.inOut", {
          targetPos: value,
        });
      },
      set: (value: number) => {
        state.targetPos = value;
        state.currentPos = value;
      },
    };
  },
});
