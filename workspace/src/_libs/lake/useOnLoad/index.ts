import { useDomRef, useSlot, withSvelte } from "lake";
import Cursor from "../../../_components/ui/cusor/script/index.svelte";
// import { useCursorTypeContext } from "../../../_stores/cursor";
// import { useMediaQuery } from "../../../_stores/mq";
// import { useRoute } from "../../../_stores/route";
import { useWindowSize } from "../../../_stores/window-size";
import { useElementSize } from "../useElementSize";
import { useSwup } from "./useSwup";
// import { useGlBack } from "../../../_components/ui/gl/script/useGlBack";
// import { useGlFront } from "../../../_components/ui/gl/script/useGlFront";
// import { usePageScroll } from "../usePageScroll";

type Refs = {
  resizeSentinel: HTMLElement;
  cursor: HTMLElement;
  glBack: HTMLCanvasElement;
  glFront: HTMLCanvasElement;
  main: HTMLElement;
};

type Props = {
  mountComponents: (scope: HTMLElement, props: Record<string, unknown>) => void;
  unmountComponents: (targets: HTMLElement[]) => void;
};

export function useOnLoad({ mountComponents, unmountComponents }: Props) {
  const { refs } = useDomRef<Refs>("resizeSentinel", "cursor", "glBack", "glFront", "main");
  const { addChild } = useSlot();

  const [_, setWindowSize] = useWindowSize();
  useElementSize(refs.resizeSentinel, (elementSize) => setWindowSize(elementSize));

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

  // const pageScrollContext = usePageScroll(refs.main, isAnyHover);
  // const glBackContext = useGlBack(refs.glBack);
  // const glFrontContext = useGlFront(refs.glFront, Math.min(window.devicePixelRatio, 1.5));

  if (isAnyHover) {
    addChild(refs.cursor, withSvelte(Cursor, "Cursor"));
  }

  useSwup({
    onCreated() {
      mountComponents(document.documentElement, { once: true });
    },
    onUpdated(scope: HTMLElement) {
      mountComponents(scope, { once: false });
    },
    onCleanup(scope: HTMLElement) {
      unmountComponents([...scope.querySelectorAll<HTMLElement>("[data-component]")]);
    },
  });
}
