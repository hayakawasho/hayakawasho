import { gsap } from "gsap";
import { defineComponent, useMount, useDomRef } from "lake";
import { useTick } from "@/_foundation/hooks";
import { splitTextNode2Words } from "@/_foundation/split-text";
import { Tween } from "@/_foundation/tween";
import { useWindowSize } from "@/_states/window-size";
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
    const { once, infiniteScrollContext, env } = context;
    const { maxY, posY, diff } = infiniteScrollContext;

    const { refs } = useDomRef<Refs>("text", "img");

    const state = {
      pc: {
        speed: .9,
      },
      sp: {
        speed: 1.75,
      },
    };


    useTick(() => {
      const scale = 1 - diff.value * .0005 * state[env.mq].speed;
      const y = gsap.utils.wrap(0, maxY.value, posY.value);

      el.style.transform = `translateY(${-y}px) translateZ(0) scale(${scale})`;
    });

    const { split, onSplitUpdate } = splitTextNode2Words(refs.text);

    useWindowSize(() => {
      onSplitUpdate();
    });

    useMount(() => {
      if (!once) {
        infiniteScrollContext.onResize();

        Tween.serial(
          Tween.prop([refs.img, split.words], {
            willChange: "transform",
            y: "1.2em",
          }),
          Tween.wait(0.1),
          Tween.parallel(
            Tween.tween([refs.img, split.words], 1.1, "custom.out", {
              stagger: 0.03,
              y: "0em",
            })
          ),
          Tween.immediate(() => {
            Tween.prop([refs.img, split.words], {
              clearProps: "will-change",
            });
          })
        );
      }

      return () => {
        Tween.kill([refs.img, split.words]);

        Tween.parallel(
          Tween.tween([refs.img, split.words], 0.5, "custom.in", {
            y: "-1.2em",
          })
        );
      };
    });
  },
});
