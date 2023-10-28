import { defineComponent, useSlot, useDomRef } from "lake";
import { useInfiniteScroll } from "@/_foundation/hooks";
import Item from "./item";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  items: HTMLElement;
  item: HTMLElement[];
};

export default defineComponent({
  name: "Works",
  setup(_el, context: AppContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("items", "item");

    const infiniteScrollContext = useInfiniteScroll(
      refs.items,
      context.mq.value
    );

    addChild(refs.item, Item, {
      ...context,
      infiniteScrollContext,
    });
  },
});
