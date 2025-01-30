import SwupParallelPlugin from "@swup/parallel-plugin";
import Swup from "swup";
import { ref } from "lake";

type Refs = {
  glBack: HTMLCanvasElement;
  glFront: HTMLCanvasElement;
  main: HTMLElement;
};

type Props = {
  onCreated: () => void;
  onUpdated: (scope: HTMLElement) => void;
  onCleanup: (scope: HTMLElement) => void;
};

export function useSwup({ onCreated, onUpdated, onCleanup }: Props) {
  let history = ref<"push" | "pop">("push");

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

  swup.hooks.on("page:view", (e) => {
    history.value = e.history.popstate ? "pop" : "push";

    // fromContainer.value = refs.main.querySelector(xhr) as HTMLElement;
    // onUpdated()
  });

  onCreated();
}
