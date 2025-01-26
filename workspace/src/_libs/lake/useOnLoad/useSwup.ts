import SwupParallelPlugin from "@swup/parallel-plugin";
import Swup from "swup";
import { useDomRef } from "lake";
import { useGlBack } from "../../../_features/gl/useGlBack";
import { useGlFront } from "../../../_features/gl/useGlFront";
import { usePageScroll } from "../../../_features/scroll";

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

  swup.hooks.on("visit:start", (e) => {
    //
  });

  swup.hooks.on("visit:end", (e) => {
    //
  });

  swup.hooks.on("history:popstate", (e) => {
    //
  });

  swup.hooks.on("page:view", (e) => {
    // fromContainer.value = refs.main.querySelector(xhr) as HTMLElement;
    // onEnter(fromContainer.value);
    // console.log("page:view");
  });

  return {
    //
  };
}
