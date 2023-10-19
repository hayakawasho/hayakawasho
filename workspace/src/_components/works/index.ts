import { defineComponent, useSlot, useDomRef } from "lake";
import { useInfiniteScroll } from "@/_foundation/hooks";
import Item from "./item";
import Thumbnail from "./thumbnail";
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

    const [thumbnailContext] = addChild(refs.list, Thumbnail, context);

    const infiniteScrollContext = useInfiniteScroll(refs.list, context.env.mq);

    addChild(refs.item, Item, {
      ...context,
      infiniteScrollContext,
      thumbnailContext: thumbnailContext.current,
    });
  },
});
