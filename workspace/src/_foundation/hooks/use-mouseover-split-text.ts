import { useEvent } from "lake";
import { Tween } from "~/_foundation/tween";
import { waitFrame } from "~/_foundation/utils";
import { useMediaQueryContext } from "~/_states/mq";

type Context = {
  chars: HTMLElement[];
  stagger?: number;
};

export const useMouseoverSplitText = (target: HTMLElement, { chars, stagger = 0.018 }: Context) => {
  const { anyHover } = useMediaQueryContext();

  useEvent(target, "mouseenter", async () => {
    if (!anyHover) {
      return;
    }

    Tween.kill(chars);
    Tween.prop(chars, {
      willChange: "transform",
      y: "0%",
    });

    await waitFrame();

    Tween.tween(chars, 1.75, "expo.out", {
      onComplete: () => {
        Tween.prop(chars, {
          clearProps: "will-change",
        });
      },
      stagger,
      y: `-100%`,
    });
  });
};
