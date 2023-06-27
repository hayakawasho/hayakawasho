import "virtual:windi.css";
import "ress";
import { create } from "lake";
import Home from "@/_components/home";
import Loader from "@/_components/loader";
// import Noop from '@/_components/noop.svelte'
import type { IComponent, ComponentContext } from "lake";

const bootstrap = () => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Home,
    // Noop: withSvelte(Noop),
  } as const;

  const mountComponents = (
    scope: HTMLElement,
    props: Record<string, unknown>
  ) => {
    return Array.from(
      scope.querySelectorAll<HTMLElement>(`[data-component]`)
    ).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || "Noop";
      try {
        const mount = component(table[`${name}`]);
        acc.push(mount(el, props));
      } catch (error) {
        console.error(error);
      }
      return acc;
    }, []);
  };

  const html = document.documentElement;

  component(Loader)(html, {
    onCleanup: (scope: HTMLElement) => {
      return unmount(
        Array.from(scope.querySelectorAll<HTMLElement>(`[data-component]`))
      );
    },
    onCreated: (context?: Record<string, unknown>) => {
      return mountComponents(html, {
        ...context,
        initialLoad: true,
      });
    },
    onUpdated: (scope: HTMLElement, context: Record<string, unknown>) => {
      return mountComponents(scope, {
        ...context,
        initialLoad: false,
      });
    },
  });
};

if (document.readyState !== "loading") {
  bootstrap();
} else {
  document.addEventListener("DOMContentLoaded", bootstrap, false);
}
