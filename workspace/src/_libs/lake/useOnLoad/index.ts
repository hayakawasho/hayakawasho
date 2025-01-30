import { useDomRef, useSlot, withSvelte } from "lake";
import Cursor from "../../../_components/ui/cusor/script/index.svelte";
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

type OnLoadProps = {
  mountComponents: (scope: HTMLElement, props: Record<string, unknown>) => void;
  unmountComponents: (targets: HTMLElement[]) => void;
};

export function useOnLoad({ mountComponents, unmountComponents }: OnLoadProps) {
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

  useSwup({
    onCleanup(scope: HTMLElement) {
      unmountComponents([...scope.querySelectorAll<HTMLElement>("[data-component]")]);
    },
    onCreated(props?: Record<string, unknown>) {
      mountComponents(document.documentElement, { ...props, once: true });
    },
    onUpdated(scope: HTMLElement, props: Record<string, unknown>) {
      mountComponents(scope, { ...props, once: false });
    },
  });
}
