import { create, withSvelte } from "lake";
import Home from "./_components/page/home/home";
import Work from "./_components/page/work/work";
import WorkSingle from "./_components/page/work-single/work-single";
import Load from "./_components/ui/load";
import NavMenu from "./_components/ui/menu";
import Noop from "./_components/ui/noop.svelte";
import type { IComponent, ComponentContext } from "lake";

(() => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Home,
    NavMenu,
    Noop: withSvelte(Noop, "Noop"),
    WorkSingle,
    Work,
  } as const;

  const mountComponents = (scope: HTMLElement, props: Record<string, unknown>) => {
    return [...scope.querySelectorAll<HTMLElement>("[data-component]")].reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || "Noop";
      try {
        const mount = component(table[`${name}`]);
        acc.push(mount(el, props));
      } catch (e) {
        console.error({
          html: scope,
          name,
          error: e,
        });
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
