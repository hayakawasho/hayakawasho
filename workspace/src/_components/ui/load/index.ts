import htmx from "htmx.org";
import { defineComponent, useDomRef, useSlot, useMount, ref, readonly, withSvelte } from "lake";
import { BREAK_POINTS } from "~/_foundation/const";
import { useElementSize } from "~/_foundation/hooks";
import { cursorTypeMutators } from "~/_states/cursor";
import { mediaQueryMutators } from "~/_states/mq";
import { routeMutators } from "~/_states/route";
import { useWindowSize } from "~/_states/window-size";
import Cursor from "../cusor/index.svelte";
import { BackCanvas, FrontCanvas } from "../glworld";
import PageScroll from "../page-scroll";
import type { AppContext, RouteName } from "~/_foundation/types";

type Props = {
  onCreated: (props?: Omit<AppContext, "once">) => void;
  onUpdated: (scope: HTMLElement, props?: Omit<AppContext, "once">) => void;
  onCleanup: (scope: HTMLElement) => void;
};

type Refs = {
  backCanvas: HTMLCanvasElement;
  frontCanvas: HTMLCanvasElement;
  main: HTMLElement;
  windowSizeWatcher: HTMLElement;
  cursor: HTMLElement;
};

export default defineComponent({
  name: "Load",
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("backCanvas", "frontCanvas", "main", "windowSizeWatcher", "cursor");

    const history = ref<"push" | "pop">("push");

    const wideQuery = window.matchMedia(BREAK_POINTS["pc"]);
    const mediaQuery = {
      anyHover: window.matchMedia("(any-hover:hover)").matches,
      device: wideQuery.matches ? "pc" : "sp",
    } as const;

    const [scrollContext] = addChild(refs.main, PageScroll, {
      anyHover: mediaQuery.anyHover,
    });

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const [backCanvasContext] = addChild(refs.backCanvas, BackCanvas, { dpr });
    const [frontCanvasContext] = addChild(refs.frontCanvas, FrontCanvas, { dpr });

    const provides = {
      backCanvasContext: backCanvasContext.current,
      frontCanvasContext: frontCanvasContext.current,
      history: readonly(history),
      scrollContext: scrollContext.current,
    } as AppContext;

    const onLeave = (from: HTMLElement) => onCleanup(from);
    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr as RouteName;
      document.body.dataset.page = namespace;

      scrollContext.current.reset();

      routeMutators({ name: namespace });
      onUpdated(to, provides);
      cursorTypeMutators("default");
    };

    const xhr = "[data-xhr]";
    const fromContainer = ref(htmx.find(refs.main, xhr) as HTMLElement);

    htmx.config.historyCacheSize = 1;

    htmx.on("htmx:historyRestore", (e) => {
      history.value = "pop";
      onLeave(fromContainer.value);

      const newContainer = htmx.find((e as CustomEvent).detail.elt, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:beforeHistorySave", (e) => {
      const oldContainer = htmx.find((e as CustomEvent).detail.historyElt, xhr) as HTMLElement;
      onLeave(oldContainer);
      fromContainer.value = oldContainer;
    });

    htmx.on("htmx:beforeSwap", () => {
      history.value = "push";
    });

    htmx.on("htmx:afterSwap", (e) => {
      const newContainer = htmx.find((e as CustomEvent).detail.target, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:xhr:loadstart", (_e) => {
      cursorTypeMutators("loading");
    });

    //----------------------------------------------------------------

    const [_, setWindowSize] = useWindowSize();

    useElementSize(refs.windowSizeWatcher, ({ width, height }) => {
      setWindowSize({
        height,
        width,
      });
    });

    //----------------------------------------------------------------

    useMount(() => {
      mediaQueryMutators(mediaQuery);

      if (mediaQuery.anyHover) {
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
