import { gsap } from "gsap";
import { defineComponent, useMount, useDomRef } from "lake";
import { useTick } from "@/_foundation/hooks";
import { splitTextNode2Words } from "@/_foundation/split-text";
import { Tween } from "@/_foundation/tween";
import type InfiniteScroll from "../../infinite-scroll";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext & {
  infiniteScrollContext: ReturnType<(typeof InfiniteScroll)["setup"]>;
};

type Refs = {
  text: HTMLElement;
  img: HTMLImageElement;
};

export default defineComponent({
  name: "Item",
  setup(el: HTMLElement, context: Props) {
    const { once, infiniteScrollContext } = context;
    const { maxY, posY } = infiniteScrollContext;

    const { refs } = useDomRef<Refs>("text", "img");

    useTick(() => {
      const y = gsap.utils.wrap(0, maxY.value, posY.value);
      el.style.transform = `translateY(${-y}px) translateZ(0)`;
    });

    useMount(() => {
      const { words } = splitTextNode2Words(refs.text);

      if (!once) {
        infiniteScrollContext.onResize();

        Tween.serial(
          Tween.prop([refs.img, words], {
            willChange: "transform",
            y: "1.2em",
          }),
          Tween.wait(0.1),
          Tween.parallel(
            Tween.tween(refs.img, 1.1, "custom.out", {
              y: "0em",
            }),
            Tween.tween(words, 1.1, "custom.out", {
              delay: 0.03,
              stagger: 0.035,
              y: "0em",
            })
          ),
          Tween.immediate(() => {
            Tween.prop([refs.img, words], {
              clearProps: "will-change",
            });
          })
        );
      }

      return () => {
        Tween.kill([refs.img, words]);

        Tween.parallel(
          Tween.tween([refs.img, words], 0.5, "custom.in", {
            y: "-1.2em",
          })
        );
      };
    });
  },
});
