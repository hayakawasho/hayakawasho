import { gsap } from "gsap";
import { defineComponent, useMount, useUnmount, useDomRef } from "lake";
import { useTick } from "@/_foundation/hooks";
import { splitTextNode2Words } from "@/_foundation/split-text";
import { Tween } from "@/_foundation/tween";
import type { AppContext } from "@/_foundation/type";
import type { ReadonlyRef } from "lake";

type Props = AppContext & {
  maxY: ReadonlyRef<number>;
  posY: ReadonlyRef<number>;
};

export default defineComponent({
  name: "Item",
  setup(el: HTMLElement, context: Props) {
    const { once, maxY, posY } = context;

    const { refs } = useDomRef<{
      text: HTMLElement;
      img: HTMLImageElement;
    }>("text", "img");

    const { words } = splitTextNode2Words(refs.text);

    useTick(() => {
      const y = gsap.utils.wrap(0, maxY.value, posY.value);
      el.style.transform = `translateY(${-y}px) translateZ(0)`;
    });

    useMount(() => {
      if (once) {
        return;
      }

      Tween.serial(
        Tween.prop([refs.img, words], {
          willChange: "transform",
          y: "1.2em",
        }),
        Tween.wait(0.1),
        Tween.parallel(
          Tween.tween([refs.img, words], 1.1, "custom.out", {
            stagger: 0.05,
            y: "0em",
          })
        ),
        Tween.immediate(() => {
          Tween.prop([refs.img, words], {
            clearProps: "will-change",
          });
        })
      );
    });

    useUnmount(() => {
      Tween.kill([refs.img, words]);

      Tween.parallel(
        Tween.tween([refs.img, words], 0.45, "custom.in", {
          stagger: 0.015,
          y: "-1.2em",
        })
      );
    });
  },
});
