import { defineComponent, useIntersectionWatch, ref } from "lake";
import { useScrollTween } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import type { GlobalContext } from "@/_foundation/type";

export default defineComponent({
  name: "project.eyecatch",
  setup(el, { env }: GlobalContext) {
    const $img = el.querySelector("img")!;
    const isVisible = ref(false);

    if (env.mq === "sp") {
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
