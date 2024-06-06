import { defineComponent, useDomRef, useMount, ref } from "lake";
import { map } from "~/_foundation/math";
import { Tween } from "~/_foundation/tween";
import { useScrollPositionContext } from "~/_states/scroll-position";
import { useWindowSizeContext } from "~/_states/window-size";
import type { AppContext } from "~/_foundation/type";

type Refs = {
  nextProject: HTMLElement;
  nextLink: HTMLElement;
  end: HTMLElement;
};

export default defineComponent({
  name: "Next",
  setup(_el, _context: AppContext) {
    const isResizing = ref(false);

    const { refs } = useDomRef<Refs>("nextLink", "end", "nextProject");
    const [_, wh] = useWindowSizeContext();

    const cache = ref({
      bottom: 0,
      currentY: 0,
      top: 0,
    });

    useMount(() => {
      const { top, bottom } = refs.end.getBoundingClientRect();

      cache.value = {
        ...cache.value,
        bottom,
        top,
      };
    });

    useScrollPositionContext(({ currentY, oldY }) => {
      if (isResizing.value || currentY === oldY) {
        return;
      }

      cache.value.currentY = currentY;

      const startPos = cache.value.top + wh.value * 0.5;
      const endPos = cache.value.bottom;
      const range = currentY + wh.value;

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
        }),
      );
    });

    useWindowSizeContext(() => {
      isResizing.value = true;

      const { top, bottom } = refs.end.getBoundingClientRect();

      cache.value = {
        ...cache.value,
        bottom: cache.value.currentY + bottom,
        top: cache.value.currentY + top,
      };

      isResizing.value = false;
    });
  },
});
