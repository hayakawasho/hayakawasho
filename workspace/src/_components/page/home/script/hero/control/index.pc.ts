import { defineComponent, useDomRef, useMount, useSlot } from "lake";
import { useElementSize } from "../../../../../../_libs/lake/useElementSize";
import type { DefineComponentContext } from "../../../../../../const";
import HeroThumb from "./pc/thumb";
import HeroVisual from "./pc/visual";

type Refs = {
  hero: HTMLElement;
  heroItem: HTMLElement[];
  heroNavigation: HTMLElement;
  heroThumbItem: HTMLElement[];
};

export default defineComponent({
  name: "HeroControl",
  setup(el, props: DefineComponentContext) {
    const { addChild } = useSlot();

    const { refs } = useDomRef<Refs>("hero", "heroItem", "heroNavigation", "heroThumbItem");

    // const smooth = ScrollSmoother.create({
    //   stiffness: 0.24,
    //   damping: 1,
    //   mass: 1.6,
    // });

    const visualContext = addChild(refs.heroItem, HeroVisual);
    const thumbContext = addChild(refs.heroThumbItem, HeroThumb);

    useElementSize(el, ({ width }) => {
      // smooth.resize(el.scrollWidth, width);
    });

    //  useWindowEvent(
    //    "wheel",
    //    smooth.onWheel,
    //    {
    //      passive: false,
    //    },
    //  );

    // useTick(({ deltaRatio }) => {
    //   smooth.raf({ deltaRatio });
    // });

    useMount(() => {
      function onSmooth({ currentY = 0 }) {
        // Tween.prop(refs.screenshotItem, {
        //   x: -currentY,
        // });
      }

      // smooth.on(onSmooth);
      // smooth.resume();

      return () => {
        // smooth.pause();
        // smooth.off(onSmooth);
      };
    });
  },
});
