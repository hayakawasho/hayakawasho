import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { Tween } from "@/_foundation/tween";
import GridItem from "./grid-item";
import InfiniteScroll from "../infinite-scroll";
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

    const [infiniteScrollContext] = addChild(
      refs.grid,
      InfiniteScroll,
      context
    );

    addChild(refs.gridItem, GridItem, {
      ...context,
      infiniteScrollContext: infiniteScrollContext.current,
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
