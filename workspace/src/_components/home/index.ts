import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useInfiniteScroll } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { nextTick } from "@/_foundation/utils";
import GridItem from "./grid-item";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  grid: HTMLElement;
  gridItem: HTMLElement[];
  char: HTMLElement[];
};

export default defineComponent({
  name: "Home",
  setup(_el, context: AppContext) {
    const { history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("grid", "gridItem", "char");

    const infiniteScrollContext = useInfiniteScroll(
      refs.grid,
      context.mq.value
    );

    addChild(refs.gridItem, GridItem, {
      ...context,
      infiniteScrollContext,
    });

    useMount(() => {
      if (history.value === "pushstate") {
        //
      }

      return async () => {
        if (history.value === "popstate") {
          return;
        }

        Tween.prop(refs.char, {
          willChange: "opacity",
        });

        await nextTick();

        Tween.parallel(
          Tween.tween(refs.char, 1.15, "power3.out", {
            alpha: 0,
            stagger: 0.02,
          })
        );
      };
    });
  },
});
