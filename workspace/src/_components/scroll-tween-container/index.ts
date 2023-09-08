import { defineComponent, ref, useEvent, useMount } from "lake";
import NormalizeWheel from "normalize-wheel";
import { clamp } from "remeda";
import { gsap } from "gsap";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { scrollPosMutators } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";

type Cache = {
  el: HTMLElement;
  parent?: Cache;
  top: number;
  bottom: number;
  offset: number;
  speed: number;
  out: boolean;
  transform: number;
};

const SELECTOR_CLASS = "[data-scroll-item]";
const _WIN = window as any;
const FIXED_STYLE = {
  left: 0,
  overflow: "hidden",
  position: "fixed",
  top: 0,
  width: "100%",
};

export default defineComponent({
  name: "scrollTweenContainer",
  setup(el) {
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

    const [_ww, wh] = useWindowSize();

    const getBounds = (el: HTMLElement, speed: number) => {
      const rect = el.getBoundingClientRect();
      const center = wh.value / 2 - rect.height / 2;
      const offset =
        rect.top < wh.value
          ? 0
          : (rect.top - center) * speed - (rect.top - center);
      const top = rect.top + offset;
      const bottom = rect.bottom + offset;

      return {
        bottom,
        offset,
        top,
      };
    };

    const createCache = (targets: HTMLElement[]) => {
      return targets.reduce<Cache[]>((acc, el) => {
        const speed = 1;
        const { top, bottom, offset } = getBounds(el, speed);

        acc.push({
          bottom,
          el,
          offset,
          out: true,
          speed,
          top,
          transform: 0,
        });

        el.style.transform = "translate3d(0, 0, 0)";

        return acc;
      }, []);
    };

    const cache = ref(createCache(smoothItem));

    const updateCache = (cache: Cache[]) => {
      return cache.map((item) => {
        const { top, bottom, offset } = getBounds(item.el, item.speed);

        return {
          ...item,
          bottom,
          offset,
          top,
        };
      });
    };

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
      _WIN,
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

    useEvent(_WIN, "touchend", () => {
      if (!state.dragging || !state.active) {
        return;
      }
      state.dragging = false;
    });

    useEvent(
      _WIN,
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
      _WIN,
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

    useTick(({ timeRatio }) => {
      if (!state.active || !state.scrollLimit) {
        return;
      }

      const EASE = 1 - (1 - 0.1) ** timeRatio;
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

    useWindowSize(() => {
      state.resizing = true;

      cache.value = updateCache(cache.value);
      state.scrollLimit = setScrollLimit();
      state.targetPos = clampTarget(state.targetPos);

      state.resizing = false;
    });

    useMount(() => {
      state.active = true;
      Object.assign(el.style, FIXED_STYLE);
    });

    return {
      pause: () => {
        state.active = false;
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
      reInit: (container: HTMLElement) => {
        Object.assign(container.style, FIXED_STYLE);

        const smoothItem = Array.from(
          container.querySelectorAll<HTMLElement>(SELECTOR_CLASS)
        );
        state.container = container;
        cache.value = createCache(smoothItem);
        state.scrollLimit = setScrollLimit();
      },
    };
  },
});
