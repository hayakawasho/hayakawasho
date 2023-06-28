import { defineComponent, ref, useEvent } from "lake";
import NormalizeWheel from "normalize-wheel";
import { Tween, useWatch as _, useTick } from "@/_foundation";
import { lerp } from "@/_foundation/math";
// import { scrollPositionMutators } from "@/states/scroll";
// import { viewportRef, viewportGetters } from "@/states/viewport";

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

export default defineComponent({
  setup(el) {
    const smoothItem = Array.from(
      el.querySelectorAll<HTMLElement>(SELECTOR_CLASS)
    );

    const _window = window as any;

    if (!smoothItem.length) {
      return;
    }

    const state = {
      active: true,
      currentPos: 0,
      dragging: false,
      position: 0,
      resizing: true,
      scrollLimit: 0,
      startPos: 0,
      targetPos: 0,
      // wh: viewportGetters().height,
      wh: 0,
    };

    const getBounds = (el: HTMLElement, speed: number) => {
      const rect = el.getBoundingClientRect();
      const center = state.wh * 0.5 - rect.height * 0.5;
      const offset =
        rect.top < state.wh
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

    const cache = ref(
      smoothItem.reduce<Cache[]>((acc, el) => {
        const speed = Number(el.dataset.speed) || 1;
        const { top, bottom, offset } = getBounds(el, speed);
        // TODO: parent

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
      }, [])
    );

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
      const { height } = el.getBoundingClientRect();
      return height >= state.wh ? height - state.wh : height;
    };

    const clampTarget = (target: number) => {
      return Math.min(Math.max(target, -0), state.scrollLimit);
    };

    const isVisible = (cache: Cache) => {
      const extra = cache.parent?.transform ?? 0;
      const translate = state.currentPos * cache.speed;
      const transform = translate - cache.offset - extra;
      const start = cache.top - translate;
      const end = cache.bottom - translate;

      const THRESHOLD = 150;
      const isVisible = start < THRESHOLD + state.wh && end > -THRESHOLD;

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
      _window,
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

    useEvent(_window, "touchend", () => {
      if (!state.dragging || !state.active) {
        return;
      }

      state.dragging = false;
    });

    useEvent(
      _window,
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
      _window,
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
      if (!state.active) {
        return;
      }

      const EASE = 1 - (1 - 0.1) ** timeRatio;
      const easeVal = lerp(state.currentPos, state.targetPos, EASE);
      state.currentPos = easeVal;

      if (state.currentPos < 0.01) {
        state.currentPos = 0;
      }

      // scrollPositionMutators({ y: state.currentPos });
      transformElms(cache.value);
    });

    // useWatch(viewportRef, (payload) => {
    //   state.resizing = true;
    //
    //   state.wh = payload.height;
    //   cache.value = updateCache(cache.value);
    //   state.scrollLimit = setScrollLimit();
    //   state.targetPos = clampTarget(state.targetPos);
    //
    //   state.resizing = false;
    // });

    const moveTo = (value: number) => {
      Tween.tween(state, 0.8, "power2.inOut", {
        targetPos: value,
      });
    };

    //----------------------------------------------------------------

    Object.assign(el.style, {
      left: 0,
      overflow: "hidden",
      position: "fixed",
      top: 0,
      width: "100%",
    });

    const resume = () => {
      state.active = true;
    };

    const pause = () => {
      state.active = false;
    };

    const scrollTo = (href: string) => {
      if (href === "#top") {
        moveTo(0);

        return;
      }

      try {
        const target = document.querySelector(href)!;
        const { top } = target.getBoundingClientRect();
        const offset = top + state.currentPos;

        moveTo(offset);
      } catch (error) {
        console.error(error);
      }
    };

    const update = () => {
      cache.value = updateCache(cache.value);
      state.scrollLimit = setScrollLimit();
    };

    return {
      pause,
      resume,
      scrollTo,
      update,
    };
  },
  tagName: "SpScroll",
});
