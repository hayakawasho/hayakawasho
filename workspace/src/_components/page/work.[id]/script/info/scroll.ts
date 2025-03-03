import { gsap } from "gsap";
import { defineComponent } from "lake";
import { useElementSize as _useElementSize } from "../../../../../_libs/lake/useElementSize";

export default defineComponent({
  name: "InfoScroll",
  setup(el) {
    const scroll = {
      auto: 0,
      delta: 0,
    };

    const onReset = () => {
      scroll.auto = 0;
      el.style.transform = `translate3d(0, 0, 0)`;
    };

    const onUpdate = ({
      deltaRatio,
      infoDialogContentHeight,
      windowHeight,
    }: {
      deltaRatio: number;
      infoDialogContentHeight: number;
      windowHeight: number;
    }) => {
      scroll.auto += 0.5 * deltaRatio;

      const cy = gsap.utils.wrap(
        -windowHeight / 2,
        infoDialogContentHeight - windowHeight / 2,
        scroll.auto,
      );
      el.style.transform = `translate3d(0, ${-cy}px, 0)`;
    };

    return {
      onReset,
      onUpdate,
    };
  },
});
