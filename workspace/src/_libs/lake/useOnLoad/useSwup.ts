import SwupHeadPlugin from "@swup/head-plugin";
import SwupParallelPlugin from "@swup/parallel-plugin";
import SwupPreloadPlugin from "@swup/preload-plugin";
import { ref } from "lake";
import Swup from "swup";

type Props = {
  onCreated: () => void;
  onUpdated: (scope: HTMLElement) => void;
  onCleanup: (scope: HTMLElement) => void;
};

const PJAX_CONTAINER_SELECTOR = "[data-xhr]";

export function useSwup({ onCreated, onUpdated, onCleanup }: Props) {
  const history = ref<"push" | "pop">("push");

  onCreated();

  const swup = new Swup({
    animationSelector: false,
    containers: [PJAX_CONTAINER_SELECTOR],
    cache: true,
    plugins: [
      new SwupParallelPlugin(),
      new SwupPreloadPlugin(),
      new SwupHeadPlugin({
        persistAssets: true,
        awaitAssets: true,
      }),
    ],
  });

  swup.hooks.on("visit:start", (visit) => {
    console.log("visit:start", visit);
  });

  swup.hooks.on("visit:end", (visit) => {
    console.log("visit:end", visit);
  });

  swup.hooks.on("page:view", (visit) => {
    console.log("page:view", visit);

    history.value = visit.history.popstate ? "pop" : "push";

    const to = visit.to.html;
    console.log(to);

    // fromContainer.value = refs.main.querySelector(xhr) as HTMLElement;
    // onUpdated()
  });
}
