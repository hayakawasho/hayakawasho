import { defineComponent, useIntersectionWatch, ref } from "lake";
import { useScrollTween } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "eyecatch",
  setup(el, { mq }: AppContext) {
    const $img = el.querySelector("img")!;
    const isVisible = ref(false);

    if (mq.value === "sp") {
      return;
    }

    useIntersectionWatch(
      el,
      ([entry]) => {
        isVisible.value = entry.isIntersecting;
      },
      {
        rootMargin: "25%",
      }
    );

    const [_] = useWindowSize(() => {
      //
    });

    useScrollTween(({ currentY, oldY }) => {
      if (!isVisible.value || currentY === oldY) {
        return;
      }
      $img.style.transform = `translateY(${currentY * 0.06}px) translateZ(0)`;
    });
  },
});
