import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useInfiniteScroll } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import GridItem from "./grid-item";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  grid: HTMLElement;
  gridItem: HTMLElement[];
  viewProjects: HTMLElement;
  w: HTMLElement[];
};

export default defineComponent({
  name: "Home",
  setup(el, context: AppContext) {
    const { once, history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("grid", "gridItem", "viewProjects", "w");

    const infiniteScrollContext = useInfiniteScroll(
      refs.grid,
      context.mq.value
    );

    addChild(refs.gridItem, GridItem, {
      ...context,
      infiniteScrollContext,
    });

    useMount(() => {
      if (!once && history.value === "pushstate") {
        return;
      }

      return () => {
        if (history.value === "popstate") {
          return;
        }

        Tween.parallel(
          Tween.tween(refs.w, 1.2, "power3.out", {
            stagger: 0.02,
            alpha: 0,
          })
        );
      };
    });
  },
});
