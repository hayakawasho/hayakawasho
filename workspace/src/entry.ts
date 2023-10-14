import "virtual:windi.css";
import "ress";
import { create, withSvelte } from "lake";
import { qsa } from "@/_foundation/utils";
import Home from "./_components/home";
import Load from "./_components/load";
import Noop from "./_components/noop.svelte";
import ProgressUI from "./_components/progress-ui.svelte";
import Work from "./_components/work";
import Works from "./_components/works";
import type { IComponent, ComponentContext } from "lake";

const init = () => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Home,
    Noop: withSvelte(Noop, "Noop"),
    ProgressUI: withSvelte(ProgressUI, "ProgressUI"),
    Work,
    Works,
  } as const;

  const mountComponents = (
    scope: HTMLElement,
    props: Record<string, unknown>
  ) => {
    return qsa<HTMLElement>("[data-component]", scope).reduce<
      ComponentContext[]
    >((acc, el) => {
      const name = el.dataset.component || "Noop";
      try {
        const mount = component(table[`${name}`]);
        acc.push(mount(el, props));
      } catch (e) {
        console.error(e);
      }
      return acc;
    }, []);
  };

  const html = document.documentElement;

  component(Load)(html, {
    onCleanup: (scope: HTMLElement) => {
      unmount(qsa<HTMLElement>("[data-component]", scope));
    },
    onCreated: (context?: Record<string, unknown>) => {
      mountComponents(html, {
        ...context,
        once: true,
      });
    },
    onUpdated: (scope: HTMLElement, context: Record<string, unknown>) => {
      mountComponents(scope, {
        ...context,
        once: false,
      });
    },
  });
};

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

if (process.env.NODE_ENV === "development") {
  const Stats = await (
    (await import("https://cdn.skypack.dev/stats.js")) as any
  ).default;
  const stats = new Stats();
  stats.showPanel(0);

  document.body.appendChild(stats.dom);

  const loop = () => {
    stats.update();
    requestAnimationFrame(loop);
  };

  loop();
}
