import { getGPUTier } from "detect-gpu";
import { defineComponent, useDomRef, useSlot, useMount } from "lake";
import modularLoad from "modularload";
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
  backto: HTMLElement;
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

    const load = new modularLoad({
      enterDelay: 501,
      // transitions: {
      // },
    });

    //----------------------------------------------------------------

    load.on("loading", (_transition: string, oldContainer: HTMLElement) => {
      scrollContext.current.pause();
      onCleanup(oldContainer);
    });

    //----------------------------------------------------------------

    load.on(
      "loaded",
      (
        _transition: string,
        _oldContainer: HTMLElement,
        newContainer: HTMLElement
      ) => {
        const namespace = newContainer.dataset.loadContainer!;
        document.body.dataset.page = namespace;

        scrollContext.current.reInit(newContainer);
        scrollContext.current.set(0);
        scrollContext.current.resume();

        onUpdated(newContainer, provides);
      }
    );

    //----------------------------------------------------------------

    useMount(() => {
      ro.observe(refs.windowSizeWatcher);
      onCreated(provides);
    });
  },
});
