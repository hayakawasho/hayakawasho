import { defineComponent, useDomRef, useMount } from "lake";
import { useElementSize } from "../../../../../_libs/lake/useElementSize";
import { useTick } from "../../../../../_libs/lake/useTick";
import { useWindowEvent } from "../../../../../_libs/lake/useWindowEvent";
import { Smoother } from "../../../../../_libs/scroll/smoother";
import { Tween } from "../../../../../_libs/tween";
import type { DefineComponentContext } from "../../../../../const";

type Refs = {
  screenshotItem: HTMLElement[];
};

export default defineComponent({
  name: "Screenshots",
  setup(el, _props: DefineComponentContext) {
    const { refs } = useDomRef<Refs>("screenshotItem");

    const smooth = new Smoother({
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
      const scrollTo = (val: number) => {
        Tween.prop(refs.screenshotItem, {
          x: -val,
        });
      };

      const onSmooth = ({ currentY = 0 }) => {
        scrollTo(currentY);
      };

      smooth.on(onSmooth);
      smooth.resume();

      return () => {
        smooth.pause();
        smooth.off(onSmooth);
      };
    });
  },
});
