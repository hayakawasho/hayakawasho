import { gsap } from "gsap";
import { defineComponent, useEvent } from "lake";

export default defineComponent({
  name: "InfoScroll",
  setup(el) {
    const scroll = {
      auto: 0,
      delta: 0,
    };

    const onReset = () => {
      scroll.auto = 0;
    };

    const onUpdate = ({ deltaRatio }: { deltaRatio: number }) => {
      scroll.auto += 0.5 * deltaRatio;

      // const cy = gsap.utils.wrap(-window.innerHeight / 2, window.innerHeight, scroll.auto)
      // el.style.transform = `translate3d(0, ${-cy}px, 0)`;
    };

    return {
      onReset,
      onUpdate,
    };
  },
});
