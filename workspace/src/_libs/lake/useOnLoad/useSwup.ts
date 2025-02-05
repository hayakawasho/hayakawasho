import SwupParallelPlugin from "@swup/parallel-plugin";
import SwupPreloadPlugin from "@swup/preload-plugin";
// import { ref } from "lake";
import Swup from "swup";

type Props = {
  onCreated: () => void;
  onUpdated: (scope: HTMLElement) => void;
  onCleanup: (scope: HTMLElement) => void;
};

export function useSwup({ onCreated, onUpdated, onCleanup }: Props) {
  // const history = ref<"push" | "pop">("push");

  const swup = new Swup({
    animationSelector: false,
    containers: ["[data-xhr]"],
    cache: true,
    plugins: [new SwupParallelPlugin(), new SwupPreloadPlugin()],
  });

  swup.hooks.on("visit:start", (e) => {
    //
  });

  swup.hooks.on("visit:end", (e) => {
    //
  });

  swup.hooks.on("page:view", (e) => {
    // history.value = e.history.popstate ? "pop" : "push";
    // fromContainer.value = refs.main.querySelector(xhr) as HTMLElement;
    // onUpdated()
  });

  onCreated();
}
