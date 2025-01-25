import { defineComponent, useDomRef, useSlot, useMount, ref, readonly, withSvelte } from "lake";
import { usePjax } from "./use-pjax";
import { useElementSize } from "../../_libs/lake/use-element-size";
import { useCursorTypeContext } from "../../_stores/cursor";
import { useMediaQuery } from "../../_stores/mq";
import { useRoute } from "../../_stores/route";
import { useWindowSize } from "../../_stores/window-size";
import Cursor from "../cusor/index.svelte";
import { useBackCanvas } from "../glworld/back";
import { useFrontCanvas } from "../glworld/front";
import { usePageScroll } from "../scroll";
// import type { AppContext } from "../../_utils/types";

type ComponentProps = {
  onCreated: (props?: Omit<AppContext, "once">) => void;
  onUpdated: (scope: HTMLElement, props?: Omit<AppContext, "once">) => void;
  onCleanup: (scope: HTMLElement) => void;
};

type Refs = {
  backCanvas: HTMLCanvasElement;
  frontCanvas: HTMLCanvasElement;
  main: HTMLElement;
  resizeSentinel: HTMLElement;
  cursor: HTMLElement;
};

export default defineComponent({
  name: "Load",
  setup(_el, { onCreated, onUpdated, onCleanup }: ComponentProps) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("backCanvas", "frontCanvas", "main", "resizeSentinel", "cursor");

    const history = ref<"push" | "pop">("push");

    const wideQuery = window.matchMedia("(min-width: 640px)");
    const anyHover = window.matchMedia("(any-hover:hover)").matches;

    const scrollContext = usePageScroll(refs.main, anyHover);

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const backCanvasContext = useBackCanvas(refs.backCanvas);
    const frontCanvasContext = useFrontCanvas(refs.frontCanvas, dpr);

    const provides = {
      backCanvasContext,
      frontCanvasContext,
      history: readonly(history),
      scrollContext,
    };

    const [, setRoute] = useRoute();
    const [, setCursorType] = useCursorTypeContext();

    const onLeave = (from: HTMLElement) => {
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr;
      document.body.dataset.page = namespace;

      scrollContext.reset();

      setRoute({ name: namespace as any });
      onUpdated(to, provides);
      setCursorType("default");
    };

    const xhr = "[data-xhr]";
    const fromContainer = ref(refs.main.querySelector(xhr) as HTMLElement);

    const {} = usePjax();

    //----------------------------------------------------------------

    const [_, setWindowSize] = useWindowSize();
    useElementSize(refs.resizeSentinel, (elementSize) => setWindowSize(elementSize));

    //----------------------------------------------------------------

    const [, setMediaQuery] = useMediaQuery();

    useMount(() => {
      const device = wideQuery.matches ? "pc" : "sp";
      setMediaQuery({ anyHover, device });

      if (anyHover) {
        addChild(refs.cursor, withSvelte(Cursor, "Cursor"));
      }

      onCreated(provides);
    });

    //----------------------------------------------------------------

    wideQuery.addEventListener("change", () => location.reload(), {
      once: true,
    });
  },
});
