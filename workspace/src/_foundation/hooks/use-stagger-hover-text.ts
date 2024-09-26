import { useEvent } from "lake";
import { Tween } from "~/_foundation/libs/tween";
import { waitFrame } from "~/_foundation/utils";
import { useMediaQuery } from "~/_states/mq";

type Options = {
  chars: HTMLElement[];
  stagger?: number;
  duration?: number;
};

export const useStaggerHoverText = (target: HTMLElement, { chars, stagger = 0.018, duration = 1.75 }: Options) => {
  const { anyHover } = useMediaQuery();

  useEvent(target, "mouseenter", async (_e) => {
    if (!anyHover) {
      return;
    }

    Tween.kill(chars);
    Tween.prop(chars, {
      willChange: "transform",
      y: "0%",
    });

    await waitFrame();

    Tween.tween(chars, duration, "expo.out", {
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
