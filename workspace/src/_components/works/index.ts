import { defineComponent, useSlot, useDomRef } from "lake";
import { useInfiniteScroll } from "@/_foundation/hooks";
import Item from "./item";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  list: HTMLElement;
  item: HTMLElement[];
};

export default defineComponent({
  name: "Works",
  setup(_el, context: AppContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("list", "item");

    const infiniteScrollContext = useInfiniteScroll(
      refs.list,
      context.mq.value
    );

    addChild(refs.item, Item, {
      ...context,
      infiniteScrollContext,
    });
  },
});
