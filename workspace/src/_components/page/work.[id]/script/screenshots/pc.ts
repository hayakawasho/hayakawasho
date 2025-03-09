import { defineComponent, useDomRef } from "lake";
import NormalizeWheel from "normalize-wheel";
import { useWindowEvent } from "../../../../../_libs/lake/useWindowEvent";
import { Tween } from "../../../../../_libs/tween";
import type { DefineComponentContext } from "../../../../../const";

type Refs = {
  screenshotItem: HTMLElement[];
};

export default defineComponent({
  name: "Screenshots",
  setup(el, props: DefineComponentContext) {
    const { refs } = useDomRef<Refs>();

    const onTouchstart = (e: TouchEvent) => {
      e.preventDefault();
    };

    const onTouchend = (e: TouchEvent) => {
      e.preventDefault();
    };

    const onTouchmove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { pixelY } = NormalizeWheel(e);
    };

    useWindowEvent("touchstart", onTouchstart, {
      passive: true,
    });

    useWindowEvent("touchend", onTouchend);

    useWindowEvent("touchmove", onTouchmove, {
      passive: true,
    });

    useWindowEvent("wheel", onWheel, {
      passive: false,
    });
  },
});
