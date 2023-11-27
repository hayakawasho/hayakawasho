import htmx from "htmx.org";
import {
  defineComponent,
  useDomRef,
  useSlot,
  useMount,
  ref,
  readonly,
} from "lake";
import { wideQuery } from "@/_foundation/env";
import { useElementSize } from "@/_foundation/hooks";
import { windowSizeMutators } from "@/_states/window-size";
import GlWorld from "../glworld";
import ScrollTweenContainer from "../scroll-tween-container";
import type { AppContext } from "@/_foundation/type";

type Props = {
  onCreated: (props?: Omit<AppContext, "once">) => void;
  onUpdated: (scope: HTMLElement, props?: Omit<AppContext, "once">) => void;
  onCleanup: (scope: HTMLElement) => void;
};

type Refs = {
  main: HTMLElement;
  glWorld: HTMLElement;
  windowSizeWatcher: HTMLElement;
};

export default defineComponent({
  name: "Load",
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("glWorld", "main", "windowSizeWatcher");

    const history = ref<"push" | "pop">("push");

    const mediaQuery = ref<"pc" | "sp">(wideQuery.matches ? "pc" : "sp");
    const readonlyMediaQuery = readonly(mediaQuery);

    const [scrollContext] = addChild(refs.main, ScrollTweenContainer, {
      mq: readonlyMediaQuery,
    });

    const [glWorldContext] = addChild(refs.glWorld, GlWorld);

    const provides = {
      glContext: glWorldContext.current,
      history: readonly(history),
      mq: readonlyMediaQuery,
      scrollContext: scrollContext.current,
    } as AppContext;

    useMount(() => {
      onCreated(provides);
    });

    //----------------------------------------------------------------

    const onLeave = (from: HTMLElement) => {
      scrollContext.current.pause();
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr;
      document.body.dataset.page = namespace;

      scrollContext.current.reInit(to);
      scrollContext.current.set(0);
      scrollContext.current.resume();

      onUpdated(to, provides);
    };

    const xhr = "[data-xhr]";
    const fromContainer = ref(htmx.find(refs.main, xhr) as HTMLElement);

    htmx.config.historyCacheSize = 1;

    htmx.on("htmx:historyRestore", (e) => {
      history.value = "pop";
      onLeave(fromContainer.value);

      const { detail } = e as CustomEvent;
      const newContainer = htmx.find(detail.elt, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:beforeHistorySave", (e) => {
      const { detail } = e as CustomEvent;
      const oldContainer = htmx.find(detail.historyElt, xhr) as HTMLElement;
      onLeave(oldContainer);
      fromContainer.value = oldContainer;
    });

    htmx.on("htmx:beforeSwap", () => {
      history.value = "push";
    });

    htmx.on("htmx:afterSwap", (e) => {
      const { detail } = e as CustomEvent;
      const newContainer = htmx.find(detail.target, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:xhr:progress", (e) => {
      const { detail } = e as CustomEvent;
      const loadProgress =
        Math.floor((detail.loaded / detail.total) * 1000) / 1000;

      console.log(loadProgress);
    });

    //----------------------------------------------------------------

    useElementSize(refs.windowSizeWatcher, ({ width, height }) => {
      windowSizeMutators({
        height,
        width,
      });
    });
  },
});
