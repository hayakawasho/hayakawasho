import { create, withSvelte, defineComponent } from "lake";
import Home from "./_components/page/home/script";
import WorkSingle from "./_components/page/work.$id/script";
import Noop from "./_libs/lake/noop.svelte";
import { useOnLoad } from "./_libs/lake/useOnLoad";
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

  component(
    defineComponent({
      name: "OnLoad",
      setup() {
        useOnLoad({
          onCleanup(scope: HTMLElement) {
            unmount([...scope.querySelectorAll<HTMLElement>("[data-component]")]);
          },
          onCreated(props?: Record<string, unknown>) {
            mountComponents(html, { ...props, once: true });
          },
          onUpdated(scope: HTMLElement, props: Record<string, unknown>) {
            mountComponents(scope, { ...props, once: false });
          },
        });
      },
    }),
  )(html);
})();
