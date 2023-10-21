import { getGPUTier } from "detect-gpu";
import htmx from "htmx.org";
import { defineComponent, useDomRef, useSlot, useMount, ref } from "lake";
import { wideQuery } from "@/_foundation/env";
import { debounce } from "@/_foundation/utils";
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

    const env: AppContext["env"] = {
      gpuTier: undefined,
      mq: wideQuery.matches ? "pc" : "sp",
    };

    getGPUTier().then((result) => {
      env.gpuTier = result;
    });

    const [scrollContext] = addChild(refs.main, ScrollTweenContainer, { env });
    const [glWorldContext] = addChild(refs.glWorld, GlWorld, { env });

    const ro = new ResizeObserver(
      debounce(([entry]) => {
        const { width, height } = entry.contentRect;
        windowSizeMutators({
          height,
          width,
        });
      }, 200)
    );

    const provides = {
      env,
      glContext: glWorldContext.current,
      scrollContext: scrollContext.current,
    } as const;

    useMount(() => {
      ro.observe(refs.windowSizeWatcher);
      onCreated(provides);
    });

    //----------------------------------------------------------------

    htmx.config.historyCacheSize = 1;

    const fromContainer = ref<HTMLElement>(
      htmx.find(refs.main, "[data-xhr]") as HTMLElement
    );

    const onLeave = (from: HTMLElement) => {
      scrollContext.current.onPause();
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr!;
      document.body.dataset.page = namespace;

      scrollContext.current.reInit(to);
      scrollContext.current.set(0);
      scrollContext.current.onPlay();

      onUpdated(to, provides);
    };

    htmx.on("htmx:historyRestore", (e) => {
      onLeave(fromContainer.value);

      const { detail } = e as CustomEvent;
      const toContainer = htmx.find(detail.elt, "[data-xhr]") as HTMLElement;
      onEnter(toContainer);
    });

    htmx.on("htmx:beforeHistorySave", (e) => {
      const { detail } = e as CustomEvent;
      const old = htmx.find(detail.historyElt, "[data-xhr]") as HTMLElement;
      onLeave(old);
      fromContainer.value = old;
    });

    htmx.on("htmx:afterSwap", (e) => {
      const { detail } = e as CustomEvent;
      const toContainer = htmx.find(detail.target, "[data-xhr]") as HTMLElement;
      onEnter(toContainer);
    });

    htmx.on("htmx:xhr:progress", (e) => {
      const { detail } = e as CustomEvent;
      const { loaded, total } = detail;

      const progress = (Math.floor((loaded / total) * 1000) / 1000) * 100;
      console.log(progress);
    });
  },
});
