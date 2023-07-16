import "virtual:windi.css";
import "ress";
import { create, withSvelte } from "lake";
import BackTo from "./_components/backto.svelte";
import Home from "./_components/home";
import Load from "./_components/load";
import Noop from "./_components/noop.svelte";
import Project from "./_components/project";
import ToScroll from "./_components/to-scroll.svelte";
import type { IComponent, ComponentContext } from "lake";

const bootstrap = (setup: () => void) => {
  if (document.readyState !== "loading") {
    setup();
    return;
  }
  document.addEventListener("DOMContentLoaded", setup, false);
};

bootstrap(() => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    backTo: withSvelte(BackTo, "backTo"),
    home: Home,
    noop: withSvelte(Noop, "noop"),
    project: Project,
    toScroll: withSvelte(ToScroll, "toScroll"),
  } as const;

  const mountComponents = (
    scope: HTMLElement,
    props: Record<string, unknown>
  ) => {
    const targets = scope.querySelectorAll<HTMLElement>(`[data-component]`);
    return Array.from(targets).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || "noop";
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
      const targets = scope.querySelectorAll<HTMLElement>(`[data-component]`);
      unmount(Array.from(targets));
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
});

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
