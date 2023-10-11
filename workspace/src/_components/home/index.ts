import {
  defineComponent,
  useSlot,
  useDomRef,
  useMount,
  useUnmount,
} from "lake";
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
      diff: infiniteScrollContext.current.diff,
      maxY: infiniteScrollContext.current.maxY,
      posY: infiniteScrollContext.current.posY,
    });

    useMount(() => {
      if (once) {
        return;
      }
    });

    useUnmount(() => {
      Tween.parallel(
        Tween.tween(el, 0.55, "power3.inOut", {
          alpha: 0,
        })
      );
    });
  },
});
