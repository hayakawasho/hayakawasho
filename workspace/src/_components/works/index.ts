import {
  defineComponent,
  useSlot,
  useDomRef,
  useMount,
  useUnmount,
} from "lake";
// import { Tween } from "@/_foundation/tween";
import Item from "./item";
import InfiniteScroll from "../infinite-scroll";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  list: HTMLElement;
  item: HTMLElement[];
};

export default defineComponent({
  name: "Works",
  setup(_el, context: AppContext) {
    const { once } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("list", "item");

    const [infiniteScrollContext] = addChild(
      refs.list,
      InfiniteScroll,
      context
    );

    addChild(refs.item, Item, {
      ...context,
      maxY: infiniteScrollContext.current.maxY,
      posY: infiniteScrollContext.current.posY,
    });

    useMount(() => {
      if (once) {
        return;
      }
    });

    useUnmount(() => {
      // Tween.tween(el, 0.55, "power3.inOut", {
      //   alpha: 0,
      // });
    });
  },
});
