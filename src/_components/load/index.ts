import { getGPUTier } from "detect-gpu";
import { defineComponent, useDomRef, useSlot, useMount } from "lake";
import modularLoad from "modularload";
import { wideQuery } from "@/_foundation/env";
import { debounce } from "@/_foundation/utils";
import { windowSizeMutators } from "@/_states/window-size";
import GlWorld from "../glworld";
import ScrollTween from "../scroll-tween";
import type { GlobalContext } from "@/_foundation/type";

type Props = {
  onCreated: (props?: Omit<GlobalContext, "initialMount">) => void;
  onUpdated: (
    scope: HTMLElement,
    props?: Omit<GlobalContext, "initialMount">
  ) => void;
  onCleanup: (scope: HTMLElement) => void;
};

export default defineComponent({
  name: "loader",
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<{
      main: HTMLElement;
      glWorld: HTMLElement;
      windowSizeWatcher: HTMLElement;
      backto: HTMLElement;
    }>("glWorld", "main", "windowSizeWatcher");

    const env: GlobalContext["env"] = {
      gpuTier: undefined,
      mq: wideQuery.matches ? "pc" : "sp",
    };

    getGPUTier().then((res) => (env.gpuTier = res));

    const [scrollContext] = addChild(refs.main, ScrollTween, {
      env,
    });
    const [glContext] = addChild(refs.glWorld, GlWorld);

    const provides = {
      env,
      glContext: glContext.current,
      scrollContext: scrollContext.current,
    };

    const load = new modularLoad({
      enterDelay: 550,
      transitions: {
        home2project: {
          enterDelay: 550,
        },
        project2home: {
          enterDelay: 350,
        },
        project2project: {
          enterDelay: 450,
        },
      },
    });

    const ro = new ResizeObserver(
      debounce(([entry]) => {
        const { width, height } = entry.contentRect;
        windowSizeMutators({ height, width });
      }, 200)
    );

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

        scrollContext.current.update(newContainer);
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
