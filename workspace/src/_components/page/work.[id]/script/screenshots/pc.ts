import { defineComponent, useDomRef, useMount } from "lake";
import { useElementSize } from "../../../../../_libs/lake/useElementSize";
import { useTick } from "../../../../../_libs/lake/useTick";
import { useWindowEvent } from "../../../../../_libs/lake/useWindowEvent";
import { ScrollSmoother } from "../../../../../_libs/scroll/smoother";
import { Tween } from "../../../../../_libs/tween";
import type { DefineComponentContext } from "../../../../../const";

type Refs = {
  screenshotItem: HTMLElement[];
};

export default defineComponent({
  name: "Screenshots",
  setup(el, _props: DefineComponentContext) {
    const { refs } = useDomRef<Refs>("screenshotItem");

    const smooth = ScrollSmoother.create({
      stiffness: 0.24,
      damping: 1,
      mass: 1.6,
    });

    useElementSize(el, ({ width }) => {
      smooth.resize(el.scrollWidth, width);
    });

    useWindowEvent(
      "wheel",
      (e) => {
        smooth.onWheel(e);
      },
      {
        passive: false,
      },
    );

    useTick(({ deltaRatio }) => {
      smooth.raf({ deltaRatio });
    });

    useMount(() => {
      function onSmooth({ currentY = 0 }) {
        Tween.prop(refs.screenshotItem, {
          x: -currentY,
        });
      }

      smooth.on(onSmooth);
      smooth.resume();

      return () => {
        smooth.pause();
        smooth.off(onSmooth);
      };
    });
  },
});
