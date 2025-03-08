import SwupHeadPlugin from "@swup/head-plugin";
import SwupParallelPlugin from "@swup/parallel-plugin";
import SwupPreloadPlugin from "@swup/preload-plugin";
import { useMount } from "lake";
import { readonly, ref } from "lake";
import Swup from "swup";

const PJAX_CONTAINER_SELECTOR = "[data-xhr]";

export function useSwup({
  created,
  updated,
  unmountComponents,
}: {
  created: (props: Record<string, unknown>) => void;
  updated: (scope: HTMLElement, props: Record<string, unknown>) => void;
  unmountComponents: (scope: HTMLElement) => void;
}) {
  const history = ref<"push" | "pop">("push");
  const readonlyHistory = readonly(history);

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

  swup.hooks.before("content:insert", (_visit, { containers }) => {
    for (const { next, previous } of containers) {
      updated(next.parentElement as HTMLElement, {
        history: readonlyHistory,
        prevRouteName: previous.dataset.xhr,
      });
    }
  });

  swup.hooks.before("content:remove", (_visit, { containers }) => {
    for (const { remove } of containers) {
      unmountComponents(remove[0].parentElement as HTMLElement);
    }
  });

  swup.hooks.on("page:view", (visit) => {
    history.value = visit.history.popstate ? "pop" : "push";
  });

  useMount(() => {
    created({
      history: readonlyHistory,
    });

    return () => {
      swup.destroy();
    };
  });
}
