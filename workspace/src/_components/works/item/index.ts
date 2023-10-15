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
  onUpdateHeight: () => void;
};

export default defineComponent({
  name: "Item",
  setup(el: HTMLElement, context: Props) {
    const { once, maxY, posY, onUpdateHeight } = context;

    const { refs } = useDomRef<{
      text: HTMLElement;
      img: HTMLImageElement;
    }>("text", "img");

    useTick(() => {
      const y = gsap.utils.wrap(0, maxY.value, posY.value);
      el.style.transform = `translateY(${-y}px) translateZ(0)`;
    });

    useMount(() => {
      const { words } = splitTextNode2Words(refs.text);

      const onLeave = () => {
        Tween.kill([refs.img, words]);

        Tween.parallel(
          Tween.tween([refs.img, words], 0.5, "custom.in", {
            y: "-1.2em",
          })
        );
      };

      if (once) {
        return () => {
          onLeave();
        };
      }

      onUpdateHeight();

      Tween.serial(
        Tween.prop([refs.img, words], {
          willChange: "transform",
          y: "1.2em",
        }),
        Tween.wait(0.1),
        Tween.parallel(
          Tween.tween([refs.img, words], 1.1, "custom.out", {
            stagger: 0.03,
            y: "0em",
          })
        ),
        Tween.immediate(() => {
          Tween.prop([refs.img, words], {
            clearProps: "will-change",
          });
        })
      );

      return () => {
        onLeave();
      };
    });
  },
});
