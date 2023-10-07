import { defineComponent, useIntersectionWatch, ref, useDomRef } from "lake";
import { map } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { useScrollTween } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  nextProject: HTMLElement;
  nextLink: HTMLElement;
  end: HTMLElement;
};

export default defineComponent({
  name: "next",
  setup(_el, _context: AppContext) {
    const isVisible = ref(false);

    const { refs } = useDomRef<Refs>("nextLink", "end", "nextProject");

    useIntersectionWatch(refs.end, ([entry]) => {
      isVisible.value = entry.isIntersecting;
    });

    const { top, bottom } = refs.end.getBoundingClientRect();
    const [_, wh] = useWindowSize();

    const cache = {
      bottom,
      currentY: 0,
      top,
      wh: wh.value,
    };

    useScrollTween(({ currentY }) => {
      if (!isVisible.value) {
        return;
      }

      cache.currentY = currentY;

      const startPos = cache.top + cache.wh * 0.5;
      const endPos = cache.bottom;
      const range = currentY + cache.wh;

      const opacity = map(range, startPos, endPos, 0, 1);
      const y = map(range, startPos, endPos, 0, 25) - 25;
      const z = -map(range, startPos, endPos, 0, 50) + 50;

      Tween.parallel(
        Tween.prop(refs.nextProject, {
          opacity,
        }),
        Tween.prop(refs.nextLink, {
          y,
          z,
        })
      );
    });

    useWindowSize(({ wh }) => {
      const { top, bottom } = refs.end.getBoundingClientRect();

      cache.top = cache.currentY + top;
      cache.bottom = cache.currentY + bottom;
      cache.wh = wh;
    });
  },
});
