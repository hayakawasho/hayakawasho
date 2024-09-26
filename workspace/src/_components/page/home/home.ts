import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import WorkSlides from "./01";
import WorkThumbs from "./02";
// import { Tween } from '~/_foundation/tween';
// import { waitFrame } from '~/_foundation/utils';
import type { AppContext } from "~/_foundation/types";

type Refs = {
  workThumb: HTMLElement[];
  workItems: HTMLElement;
  workItem: HTMLElement[];
  workTitle: HTMLElement[];
};

export default defineComponent({
  name: "Home",
  setup(_el, context: AppContext) {
    const { history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("workThumb", "workItems", "workItem", "workTitle");

    addChild(refs.workItems, WorkSlides, context);

    useMount(() => {
      if (history.value === "push") {
        //
      }

      return async () => {
        if (history.value === "pop") {
          return;
        }
      };
    });
  },
});
