import SwupParallelPlugin from "@swup/parallel-plugin";
import Swup from "swup";
import { useDomRef, ref } from "lake";
import { useGlBack } from "../../../_components/ui/gl/script/useGlBack";
import { useGlFront } from "../../../_components/ui/gl/script/useGlFront";
import { usePageScroll } from "../usePageScroll";

type Refs = {
  glBack: HTMLCanvasElement;
  glFront: HTMLCanvasElement;
  main: HTMLElement;
};

type Props = {
  onCreated: (props?: any) => void;
  onUpdated: (scope: HTMLElement, props?: any) => void;
  onCleanup: (scope: HTMLElement) => void;
};

export function useSwup({ onCreated, onUpdated, onCleanup }: Props) {
  const { refs } = useDomRef<Refs>("glBack", "glFront", "main");

  const history = ref<"push" | "pop">("push");

  const isAnyHover = true;

  const pageScrollContext = usePageScroll(refs.main, isAnyHover);
  const glBackContext = useGlBack(refs.glBack);
  const glFrontContext = useGlFront(refs.glFront, Math.min(window.devicePixelRatio, 1.5));

  const contexts = {
    pageScrollContext,
    glBackContext,
    glFrontContext,
  };

  onCreated(contexts);

  const swup = new Swup({
    animationSelector: false,
    containers: ["[data-xhr]"],
    cache: true,
    plugins: [
      new SwupParallelPlugin(),
      // new e(hr('{"preloadHoveredLinks":true,"preloadVisibleLinks":false}')),
      // new t(hr("{}")),
      // new n(hr('{"awaitAssets":true}')),
      // new r(hr("{}")),
    ],
  });

  swup.hooks.on("visit:start", (e) => {});

  swup.hooks.on("visit:end", (e) => {
    //
  });

  swup.hooks.on("page:view", (e) => {
    if (e.history.popstate) {
      history.value = "pop";
    } else {
      history.value = "push";
    }

    // fromContainer.value = refs.main.querySelector(xhr) as HTMLElement;
    // onUpdated()
  });

  return {
    //
  };
}
