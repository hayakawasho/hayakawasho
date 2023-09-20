import {
  defineComponent,
  useSlot,
  useDomRef,
  ref,
  readonly,
  useEvent,
} from "lake";
import NormalizeWheel from "normalize-wheel";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { useWindowSize } from "@/_states/window-size";
import Plane from "./plane";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "home.grid",
  setup(el, context: AppContext) {
    const { env } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<{ plane: HTMLImageElement[] }>("plane");

    const { height } = el.getBoundingClientRect();
    const maxY = ref(height / 2);
    const posY = ref(0);
    const diff = ref(0);

    const state = {
      dragging: false,
      position: 0,
      startPos: 0,
      targetPos: 0,
    };

    useEvent(
      window as any,
      "wheel",
      (e) => {
        const { pixelY } = NormalizeWheel(e);
        state.targetPos += pixelY;
      },
      {
        passive: true,
      }
    );

    useEvent(
      window as any,
      "touchstart",
      (e) => {
        state.dragging = true;
        state.position = posY.value;
        state.startPos = e.touches[0].clientY;
      },
      {
        passive: true,
      }
    );

    useEvent(window as any, "touchend", () => {
      if (!state.dragging) {
        return;
      }
      state.dragging = false;
    });

    useEvent(
      window as any,
      "touchmove",
      (e) => {
        if (!state.dragging) {
          return;
        }

        const y = e.touches[0].clientY;
        const distance = (state.startPos - y) * 2;
        state.targetPos = state.position + distance;
      },
      {
        passive: true,
      }
    );

    useWindowSize(() => {
      maxY.value = el.getBoundingClientRect().height / 2;
    });

    const EASE = {
      pc: 0.15,
      sp: 0.1,
    } as const;

    useTick(({ timeRatio }) => {
      const oldY = posY.value;

      const p = 1 - (1 - EASE[env.mq]) ** timeRatio;
      const easeVal = lerp(posY.value, state.targetPos, p);
      posY.value = easeVal;

      diff.value = oldY - posY.value;
    });

    addChild(refs.plane, Plane, {
      ...context,
      posY: readonly(posY),
      diff: readonly(diff),
      maxY: readonly(maxY),
    });
  },
});
