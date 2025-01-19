import Swup from "swup";
// import SwupParallelPlugin from "@swup/parallel-plugin";

export const usePjax = () => {
  const swup = new Swup({
    animationSelector: false,
    containers: ["[data-xhr]"],
    cache: true,
    plugins: [
      // new e(hr('{"preloadHoveredLinks":true,"preloadVisibleLinks":false}')),
      // new t(hr("{}")),
      // new n(hr('{"awaitAssets":true}')),
      // new r(hr("{}")),
    ],
  });

  // swup.hooks.on("visit:start", (e) => {
  //   //
  // });

  // swup.hooks.on("visit:end", (e) => {
  // swup.hooks.on  console.log("visit:end");
  // swup.hooks.on});

  // swup.hooks.on("page:view", (e) => {
  //   fromContainer.value = refs.main.querySelector(xhr) as HTMLElement;
  //   onEnter(fromContainer.value);
  //   console.log("page:view");
  // });

  // swup.hooks.on("history:popstate", (e) => {
  //   //
  // });

  return {};
};

/*----------------------------------------------------------------
async function $0() {
    const [i,e,t,n,r] = await Promise.all([Fn( () => import("./Swup.DqNKVCHi.js").then(a => a.S), []).then(a => a.default), Fn( () => import("./SwupPreloadPlugin.B6XrBEKK.js"), __vite__mapDeps([0, 1, 2])).then(a => a.default), Fn( () => import("./SwupBodyClassPlugin.aa8fLSdp.js"), __vite__mapDeps([3, 1])).then(a => a.default), Fn( () => import("./SwupHeadPlugin.FjGODCox.js"), __vite__mapDeps([4, 1])).then(a => a.default), Fn( () => import("./SwupScriptsPlugin.o5PkFIdr.js"), __vite__mapDeps([5, 1])).then(a => a.default)])
      , s = new i({
        animationSelector: !1,
        containers: ["#PageContainer"],
        cache: !0,
        plugins: [new e(hr('{"preloadHoveredLinks":true,"preloadVisibleLinks":false}')), new t(hr("{}")), new n(hr('{"awaitAssets":true}')), new r(hr("{}"))]
    });
    window.swup = s
}
*/

/*
    htmx.config.historyCacheSize = 1;

    htmx.on("htmx:historyRestore", (e) => {
      history.value = "pop";
      onLeave(fromContainer.value);

      const newContainer = htmx.find((e as CustomEvent).detail.elt, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:beforeHistorySave", (e) => {
      const oldContainer = htmx.find((e as CustomEvent).detail.historyElt, xhr) as HTMLElement;
      onLeave(oldContainer);
      fromContainer.value = oldContainer;
    });

    htmx.on("htmx:beforeSwap", () => {
      history.value = "push";
    });

    htmx.on("htmx:afterSwap", (e) => {
      const newContainer = htmx.find((e as CustomEvent).detail.target, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:xhr:loadstart", (_e) => {
      cursorTypeMutators("loading");
    });

    */
