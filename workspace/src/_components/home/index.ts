import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useInfiniteScroll } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import GridItem from "./grid-item";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  grid: HTMLElement;
  gridItem: HTMLElement[];
};

export default defineComponent({
  name: "Home",
  setup(el, context: AppContext) {
    const { once } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("grid", "gridItem");

    const infiniteScrollContext = useInfiniteScroll(
      refs.grid,
      context.mq.value
    );

    addChild(refs.gridItem, GridItem, {
      ...context,
      infiniteScrollContext,
    });

    useMount(() => {
      if (once) {
        return;
      }

      return () => {
        Tween.parallel(
          Tween.tween(el, 0.55, "power3.inOut", {
            alpha: 0,
          })
        );
      };
    });
  },
});
