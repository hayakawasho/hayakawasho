import { create, withSvelte } from "lake";
import WorkSingle from "./_components/page/[id]/script";
import Home from "./_components/page/home/script";
import Load from "./_features/load";
import Noop from "./_features/noop.svelte";
import type { IComponent, ComponentContext } from "lake";

(() => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Home,
    Noop: withSvelte(Noop, "Noop"),
    WorkSingle,
  } as const;

  const mountComponents = (scope: HTMLElement, props: Record<string, unknown>) => {
    return [...scope.querySelectorAll<HTMLElement>("[data-component]")].reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || "Noop";

      try {
        const mount = component(table[`${name}`]);
        acc.push(mount(el, props));
      } catch (error) {
        console.error({ name, html: scope, error });
      }

      return acc;
    }, []);
  };

  const html = document.documentElement;

  const loadProvides = {
    onCleanup: (scope: HTMLElement) => {
      unmount([...scope.querySelectorAll<HTMLElement>("[data-component]")]);
    },
    onCreated: (context?: Record<string, unknown>) => {
      mountComponents(html, { ...context, once: true });
    },
    onUpdated: (scope: HTMLElement, context: Record<string, unknown>) => {
      mountComponents(scope, { ...context, once: false });
    },
  };

  component(Load)(html, loadProvides);
})();
