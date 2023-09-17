import { defineComponent, useIntersectionWatch, ref, useDomRef } from "lake";
import { map } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { useScrollTween } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "project.next",
  setup(_el, _context: AppContext) {
    const isVisible = ref(false);

    const { refs } = useDomRef<{
      nextHGroup: HTMLElement;
      end: HTMLElement;
    }>("nextHGroup", "end");

    useIntersectionWatch(refs.end, ([entry]) => {
      isVisible.value = entry.isIntersecting;
    });

    const [_, wh] = useWindowSize();

    const { top: startPos, bottom: endPos } = refs.end.getBoundingClientRect();

    useScrollTween(({ currentY }) => {
      if (!isVisible.value) {
        return;
      }

      const opacity = map(
        currentY + wh.value,
        startPos + wh.value * 0.6,
        endPos - wh.value * 0.01,
        0,
        1
      );

      Tween.prop(refs.nextHGroup, {
        opacity,
      });
    });
  },
});
