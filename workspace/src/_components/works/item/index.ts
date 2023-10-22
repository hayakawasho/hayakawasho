import { defineComponent, useMount, useDomRef } from "lake";
import { useTick } from "@/_foundation/hooks";
import { splitTextNode2Words } from "@/_foundation/split-text";
import { Tween } from "@/_foundation/tween";
import { useWindowSize } from "@/_states/window-size";
import type Thumbnail from "../thumbnail";
import type { useInfiniteScroll } from "@/_foundation/hooks";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext & {
  infiniteScrollContext: ReturnType<typeof useInfiniteScroll>;
  thumbnailContext: ReturnType<(typeof Thumbnail)["setup"]>;
};

type Refs = {
  text: HTMLElement;
  img: HTMLImageElement;
};

export default defineComponent({
  name: "Item",
  setup(el: HTMLElement, context: Props) {
    const { once, infiniteScrollContext, mq, history } = context;
    const { posY, diff } = infiniteScrollContext;

    const { refs } = useDomRef<Refs>("text", "img");

    const state = {
      pc: {
        speed: 0.9,
      },
      sp: {
        speed: 1,
      },
    };

    // const [_, wh] = useWindowSize();

    useTick(() => {
      const scale = 1 - diff.value * 0.0005 * state[mq.value].speed;
      const y = infiniteScrollContext.wrap(posY.value);

      el.style.transform = `translateY(${-y}px) translateZ(0) scale(${scale})`;
    });

    const { split, onSplitUpdate } = splitTextNode2Words(refs.text);

    useWindowSize(() => {
      onSplitUpdate();
      infiniteScrollContext.onResize();
    });

    useMount(() => {
      if (!once && history.value === "pushstate") {
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
        if (history.value === "popstate") {
          return;
        }

        Tween.kill([refs.img, split.words]);

        Tween.tween([refs.img, split.words], 0.5, "custom.in", {
          y: "-1.2em",
        });
      };
    });
  },
});
