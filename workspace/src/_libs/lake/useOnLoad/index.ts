import { useDomRef, useSlot, withSvelte } from "lake";
import Cursor from "../../../_features/cusor/index.svelte";
// import { useCursorTypeContext } from "../../../_stores/cursor";
// import { useMediaQuery } from "../../../_stores/mq";
// import { useRoute } from "../../../_stores/route";
import { useWindowSize } from "../../../_stores/window-size";
import { useElementSize } from "../useElementSize";
import { useSwup } from "./useSwup";

type Refs = {
  resizeSentinel: HTMLElement;
  cursor: HTMLElement;
};

export function useOnLoad(props: Parameters<typeof useSwup>[0]) {
  const { refs } = useDomRef<Refs>("resizeSentinel", "cursor");
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

  if (isAnyHover) {
    addChild(refs.cursor, withSvelte(Cursor, "Cursor"));
  }

  useSwup(props);
}
