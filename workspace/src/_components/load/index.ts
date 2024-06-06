import htmx from "htmx.org";
import {
  defineComponent,
  useDomRef,
  useSlot,
  useMount,
  useEvent,
  ref,
  readonly,
  withSvelte,
} from "lake";
import { useElementSize } from "~/_foundation/hooks";
import { BREAK_POINTS } from "~/_foundation/mq";
import { cursorTypeMutators } from "~/_states/cursor";
import { mediaQueryMutators } from "~/_states/mq";
import { routeMutators } from "~/_states/route";
import { scrollStateYMutators } from "~/_states/scroll";
import { scrollPositionMutators } from "~/_states/scroll-position";
import { windowSizeMutators } from "~/_states/window-size";
import Cursor from "../cursor.svelte";
import BackCanvas from "../glworld/back";
import FrontCanvas from "../glworld/front";
import PageScroll from "../page-scroll";
import type { AppContext, RouteName } from "~/_foundation/type";

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
    const { refs } = useDomRef<Refs>(
      "backCanvas",
      "frontCanvas",
      "main",
      "windowSizeWatcher",
      "cursor",
    );

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

    const appProvides = {
      backCanvasContext: backCanvasContext.current,
      frontCanvasContext: frontCanvasContext.current,
      history: readonly(history),
      scrollContext: scrollContext.current,
    } as AppContext;

    //----------------------------------------------------------------

    const onLeave = (from: HTMLElement) => {
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr as RouteName;
      document.body.dataset.page = namespace;

      scrollContext.current.reset();
      scrollPositionMutators(0);

      onUpdated(to, appProvides);
      cursorTypeMutators("default");
      routeMutators({
        name: namespace,
      });
    };

    const xhr = "[data-xhr]";
    const fromContainer = ref(htmx.find(refs.main, xhr) as HTMLElement);

    htmx.config.historyCacheSize = 1;

    htmx.on("htmx:historyRestore", e => {
      history.value = "pop";
      onLeave(fromContainer.value);

      const newContainer = htmx.find((e as CustomEvent).detail.elt, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:beforeHistorySave", e => {
      const oldContainer = htmx.find((e as CustomEvent).detail.historyElt, xhr) as HTMLElement;
      onLeave(oldContainer);
      fromContainer.value = oldContainer;
    });

    htmx.on("htmx:beforeSwap", () => {
      history.value = "push";
    });

    htmx.on("htmx:afterSwap", e => {
      const newContainer = htmx.find((e as CustomEvent).detail.target, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:xhr:loadstart", _e => {
      cursorTypeMutators("loading");
    });

    //----------------------------------------------------------------

    useMount(() => {
      mediaQueryMutators(mediaQuery);

      if (mediaQuery.anyHover) {
        addChild(refs.cursor, withSvelte(Cursor, "Cursor"));
      }

      onCreated(appProvides);
    });

    //----------------------------------------------------------------

    wideQuery.addEventListener(
      "change",
      () => {
        location.reload();
      },
      {
        once: true,
      },
    );

    //----------------------------------------------------------------

    useElementSize(refs.windowSizeWatcher, ({ width, height }) => {
      windowSizeMutators({
        height,
        width,
      });
    });

    //----------------------------------------------------------------

    let timer: number;

    useEvent(
      window as any,
      "scroll",
      () => {
        clearTimeout(timer);

        scrollStateYMutators({
          scrolling: true,
        });

        timer = window.setTimeout(() => {
          scrollStateYMutators({
            scrolling: false,
          });
        }, 500);
      },
      {
        passive: true,
      },
    );
  },
});
