import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { ScrollTween } from "../scroll";
// import { Tween } from '@/_foundation/tween';
// import { waitFrame } from '@/_foundation/utils';
import Item from "./item";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  project: HTMLElement[];
};

export default defineComponent({
  name: "Home",
  setup(_el, context: AppContext) {
    const { history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("project");

    addChild(refs.project, Item, context);

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
