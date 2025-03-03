import { useDomRef, useSlot } from "lake";
import { useGlBack } from "../../../_components/ui/gl/script/useGlBack";
import { useGlFront } from "../../../_components/ui/gl/script/useGlFront";
// import Cursor from "../../../_components/ui/cusor/script/index.svelte";
// import { withSvelte } from "../../../_libs/lake/withSvelte";
// import { useCursorTypeContext } from "../../../_stores/cursor";
// import { useMediaQuery } from "../../../_stores/mq";
// import { useRoute } from "../../../_stores/route";
import { globalStore } from "../../../_states";
import { useElementSize } from "../useElementSize";
import { useSwup } from "./useSwup";

type Refs = {
  resizeSentinel: HTMLElement;
  cursor: HTMLElement;
  glBack: HTMLCanvasElement;
  glFront: HTMLCanvasElement;
  main: HTMLElement;
};

export function useOnLoad({
  mountComponents,
  unmountComponents,
}: {
  mountComponents: (scope: HTMLElement, props: Record<string, unknown>) => void;
  unmountComponents: (scope: HTMLElement) => void;
}) {
  const { refs } = useDomRef<Refs>(
    "resizeSentinel",
    "cursor",
    "glBack",
    "glFront",
    "main",
  );

  const { addChild: _addChild } = useSlot();

  useElementSize(refs.resizeSentinel, ({ width, height }) => {
    globalStore.getState().bounds.resizeWindow(width, height);
  });

  const wideQuery = window.matchMedia("(min-width: 640px)");
  wideQuery.addEventListener(
    "change",
    () => {
      location.reload();
    },
    {
      once: true,
    },
  );

  const isAnyHover = window.matchMedia("(any-hover:hover)").matches;
  const dpr = Math.min(window.devicePixelRatio, 1.5);

  const glBackContext = useGlBack(refs.glBack);
  const glFrontContext = useGlFront(refs.glFront, dpr);

  if (isAnyHover) {
    // addChild(refs.cursor, withSvelte(Cursor, "Cursor"));
  }

  useSwup({
    created(props) {
      mountComponents(document.documentElement, {
        ...props,
        once: true,
      });
    },
    updated(scope, props) {
      mountComponents(scope, {
        ...props,
        once: false,
      });
    },
    unmountComponents,
  });
}
