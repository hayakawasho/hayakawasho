import { gsap } from "gsap";
import {
  defineComponent,
  useMount,
  useUnmount,
  useIntersectionWatch,
} from "lake";
import { useTick } from "@/_foundation/hooks";
// import { Tween } from "@/_foundation/tween";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";
import type { ReadonlyRef } from "lake";

type Props = Pick<AppContext, "glContext" | "env"> & {
  maxY: ReadonlyRef<number>;
  posY: ReadonlyRef<number>;
};

export default defineComponent({
  name: "Item",
  setup(el: HTMLElement, context: Props) {
    const { maxY, posY } = context;

    const state = {
      resizing: false,
      visible: false,
    };

    useIntersectionWatch(
      el,
      ([entry]) => {
        state.visible = entry.isIntersecting;
      },
      {
        rootMargin: "25%",
      }
    );

    useWindowSize(() => {
      state.resizing = true;

      //

      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }

      const y = gsap.utils.wrap(0, maxY.value, posY.value);

      el.style.transform = `translateY(${-y}px) translateZ(0)`;
    });

    useMount(() => {
      //
    });

    useUnmount(() => {
      //
    });
  },
});
