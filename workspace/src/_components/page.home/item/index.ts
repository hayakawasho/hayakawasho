import { defineComponent, useMount, useDomRef } from "lake";
import { splitTextNode2Words } from "@/_foundation/split-text";
import { useWindowSizeContext } from "@/_states/window-size";
import { Tween } from "@/_foundation/tween";
import { waitFrame } from "@/_foundation/utils";
import type { Object3D } from "@/_foundation/three";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext & {
  // parentScene: Object3D;
};

type Refs = {
  text: HTMLElement;
};

export default defineComponent({
  name: "Item",
  setup(el: HTMLElement, context: Props) {
    const { once, history } = context;
    const { refs } = useDomRef<Refs>("text");

    const [, , { isResizing }] = useWindowSizeContext(() => {
      onSplitUpdate();
    });

    const { split, onSplitUpdate } = splitTextNode2Words(refs.text);

    useMount(() => {
      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop([split.words], {
            willChange: "transform",
            y: "1.2em",
          }),
          Tween.wait(0.1),
          Tween.parallel(
            Tween.tween([split.words], 2.2, "expo.out", {
              stagger: 0.03,
              y: "0em",
            }),
          ),
          Tween.immediate(() => {
            Tween.prop([split.words], {
              clearProps: "will-change",
            });
          }),
        );
      }

      return async () => {
        if (history.value === "pop") {
          return;
        }

        Tween.kill([split.words]);
        Tween.prop([split.words], {
          willChange: "transform",
        });

        await waitFrame();

        Tween.tween([split.words], 0.45, "custom.in", {
          y: "-1.2em",
        });
      };
    });
  },
});
