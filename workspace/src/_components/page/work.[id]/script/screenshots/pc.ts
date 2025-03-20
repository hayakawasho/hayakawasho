import { defineComponent, useDomRef, useMount, useSlot } from "lake";
import { useElementSize } from "../../../../../_libs/lake/useElementSize";
import { useTick } from "../../../../../_libs/lake/useTick";
import { useWindowEvent } from "../../../../../_libs/lake/useWindowEvent";
import { ScrollSmoother } from "../../../../../_libs/scroll/smoother";
import type { DefineComponentContext } from "../../../../../const";
import ScreenShotItem from "./item";

type Refs = {
  screenshotItem: HTMLElement[];
};

export default defineComponent({
  name: "ScreenShots",
  setup(el, props: DefineComponentContext) {
    const { refs } = useDomRef<Refs>("screenshotItem");
    const { addChild } = useSlot();

    const smooth = ScrollSmoother.create({
      stiffness: 0.24,
      damping: 1,
      mass: 1.6,
    });

    useElementSize(el, ({ width }) => {
      smooth.resize(el.scrollWidth, width);
    });

    useWindowEvent("wheel", smooth.onWheel, {
      passive: false,
    });

    useTick(({ deltaRatio }) => {
      smooth.raf({ deltaRatio });
    });

    useMount(() => {
      console.log("mount");

      const screenshotItemsContext = addChild(refs.screenshotItem, ScreenShotItem, props);

      function onSmooth({ currentY = 0 }) {
        screenshotItemsContext.forEach((item) => {
          item.current.updateX(-currentY);
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
