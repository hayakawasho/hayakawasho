import { getGPUTier } from "detect-gpu";
import { defineComponent, useDomRef, useSlot, useMount } from "lake";
import { wideQuery } from "@/_foundation/env";
import { debounce } from "@/_foundation/utils";
import { windowSizeMutators } from "@/_states/window-size";
import GlWorld from "../glworld";
import ScrollTween from "../scroll-tween";
import type { GlobalContext } from "@/_foundation/type";

type Props = {
  onCreated: (props?: Omit<GlobalContext, "initialLoad">) => void;
  onUpdated: (
    scope: HTMLElement,
    props?: Omit<GlobalContext, "initialLoad">
  ) => void;
  onCleanup: (scope: HTMLElement) => void;
};

export default defineComponent({
  name: "loader",
  setup(_el, { onCreated }: Props) {
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
    };

    const ro = new ResizeObserver(
      debounce(([entry]) => {
        const { width, height } = entry.contentRect;
        windowSizeMutators({ height, width });
      }, 200)
    );

    useMount(() => {
      ro.observe(refs.windowSizeWatcher);

      scrollContext.current!.update();
      onCreated(provides);
    });
  },
});
