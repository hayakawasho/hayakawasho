import { useDomRef, useMount, useSlot } from "lake";
import Cursor from "../../../_components/ui/cusor/script/index.svelte";
import Gl from "../../../_components/ui/gl/script";
import { useRepeatNoise } from "../../../_components/ui/gl/script/noise/useRepeatNoise";
import { withSvelte } from "../../../_libs/lake/withSvelte";
import { globalStore } from "../../../_states";
import { useElementSize } from "../useElementSize";
import { useSwup } from "./useSwup";

type Refs = {
  resizeSentinel: HTMLElement;
  cursor: HTMLElement;
  glBack: HTMLCanvasElement;
  glFront: HTMLCanvasElement;
  main: HTMLElement;
};

export function useOnLoad({
  mountComponents,
  unmountComponents,
}: {
  mountComponents: (scope: HTMLElement, props: Record<string, unknown>) => void;
  unmountComponents: (scope: HTMLElement) => void;
}) {
  const { refs } = useDomRef<Refs>(
    "resizeSentinel",
    "cursor",
    "glBack",
    "glFront",
    "main",
  );

  const { addChild } = useSlot();

  useElementSize(refs.resizeSentinel, ({ width, height }) => {
    globalStore.getState().bounds.resizeWindow(width, height);
  });

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

  const device = wideQuery.matches ? "pc" : "sp";

  const anyHover = window.matchMedia("(any-hover:hover)").matches
    ? "hover"
    : "none";

  const dpr = Math.min(window.devicePixelRatio, 1.5);

  const [glBackContext] = addChild(refs.glBack, Gl, {
    resolution: 1,
    device,
    anyHover,
  });

  const [glFrontContext] = addChild(refs.glFront, Gl, {
    resolution: dpr,
    device,
    anyHover,
  });

  const noise = useRepeatNoise(refs.glBack, 1, device);

  useMount(() => {
    glBackContext.current.addScene(noise);

    if (anyHover === "hover") {
      addChild(refs.cursor, withSvelte(Cursor, "Cursor"));
    }

    return () => {
      glBackContext.current.removeScene(noise);
    };
  });

  useSwup({
    created(props) {
      mountComponents(document.documentElement, {
        ...props,
        once: true,
        device,
        anyHover,
        glBackContext: glBackContext.current,
        glFrontContext: glFrontContext.current,
      });
    },
    updated(scope, props) {
      mountComponents(scope, {
        ...props,
        once: false,
        device,
        anyHover,
        glBackContext: glBackContext.current,
        glFrontContext: glFrontContext.current,
      });
    },
    unmountComponents,
  });
}
