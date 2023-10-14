import { gsap } from "gsap";
import {
  defineComponent,
  useSlot,
  useDomRef,
  useMount,
  useUnmount,
} from "lake";
import { Tween } from "@/_foundation/tween";
import Item from "./item";
import InfiniteScroll from "../infinite-scroll";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  list: HTMLElement;
  item: HTMLElement[];
};

export default defineComponent({
  name: "Works",
  setup(el, context: AppContext) {
    const { once } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("list", "item");

    const q = gsap.utils.selector(refs.list);

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

      Tween.serial(
        Tween.prop(q(".js-item"), {
          willChange: "transform",
          y: "1.2em",
        }),
        Tween.wait(0.1),
        Tween.parallel(
          Tween.tween(q(".js-item"), 1.2, "custom.out", {
            y: "0em",
          })
        ),
        Tween.immediate(() => {
          Tween.prop([q(".js-item")], {
            clearProps: "will-change",
          });
        })
      );
    });

    useUnmount(() => {
      Tween.kill(q(".js-item"));

      Tween.tween(q(".js-item"), 0.5, "custom.in", {
        y: "-1.2em",
      });
    });
  },
});
