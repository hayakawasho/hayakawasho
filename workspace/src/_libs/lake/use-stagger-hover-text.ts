import { useEvent } from "lake";
import { useMediaQuery } from "../../_stores/mq";
import { waitFrame } from "../../_utils/wait";
import { Tween } from "../tween";

type Options = {
  stagger?: number;
  duration?: number;
};

export const useStaggerHoverText = (
  target: HTMLElement,
  chars: HTMLElement[],
  { stagger = 0.02, duration = 1.45 }: Options,
) => {
  const { anyHover } = useMediaQuery();

  useEvent(target, "mouseenter", async (_e) => {
    if (!anyHover) {
      return;
    }

    Tween.kill(chars);
    Tween.prop(chars, {
      willChange: "transform",
      yPercent: 0,
    });

    await waitFrame();

    Tween.tween(chars, duration, "expo.out", {
      onComplete: () => {
        Tween.prop(chars, {
          clearProps: "will-change",
        });
      },
      stagger,
      yPercent: -100,
    });
  });
};
