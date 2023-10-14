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
  text: HTMLElement[];
};

export default defineComponent({
  name: "Works",
  setup(el, context: AppContext) {
    const { once } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("list", "item", "text");

    const q = gsap.utils.selector(refs.list);
    const itemsDom = q(".js-item");

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
        Tween.prop(itemsDom, {
          willChange: "transform",
          y: "1.2em",
        }),
        Tween.wait(0.1),
        Tween.parallel(
          Tween.tween(itemsDom, 1.3, "custom.out", {
            y: "0%",
          })
        ),
        Tween.immediate(() => {
          Tween.prop([itemsDom], {
            clearProps: "will-change",
          });
        })
      );
    });

    useUnmount(() => {
      Tween.kill(itemsDom);

      Tween.parallel(
        Tween.tween(itemsDom, 0.4, "custom.in", {
          y: "-1.2em",
        }),
        Tween.tween(el, 0.55, "power3.inOut", {
          alpha: 0,
        })
      );
    });
  },
});
