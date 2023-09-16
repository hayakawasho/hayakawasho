import { defineComponent, useIntersectionWatch, ref, useDomRef } from "lake";
import { Tween } from "@/_foundation/tween";
import { map } from "@/_foundation/math";
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

    const [_ww, wh] = useWindowSize();

    const { top: startPos, bottom: endPos } = refs.end.getBoundingClientRect();

    useScrollTween(({ currentY }) => {
      if (!isVisible.value) {
        return;
      }

      const y = map(
        currentY + wh.value,
        startPos + wh.value * 0.6,
        endPos,
        0,
        100
      );

      Tween.prop(refs.nextHGroup, {
        y: -y + 100 + "%",
      });
    });
  },
});
