import { defineComponent, useSlot, useDomRef } from "lake";
import Item from "./item";
import Thumbnail from "./thumbnail";
import InfiniteScroll from "../infinite-scroll";
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

    const [infiniteScrollContext] = addChild(
      refs.list,
      InfiniteScroll,
      context
    );

    addChild(refs.item, Item, {
      ...context,
      infiniteScrollContext: infiniteScrollContext.current,
      thumbnailContext: thumbnailContext.current,
    });
  },
});
