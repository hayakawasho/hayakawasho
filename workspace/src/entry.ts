import { create, defineComponent } from "lake";
import type { ComponentContext, IComponent } from "lake";
import Home from "./_components/page/home/script";
import WorkSingle from "./_components/page/work.[id]/script";
import Noop from "./_libs/lake/noop.svelte";
import { useOnLoad } from "./_libs/lake/useOnLoad";
import { withSvelte } from "./_libs/lake/withSvelte";

(() => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Noop: withSvelte(Noop, "Noop"),
    Home,
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

  component(
    defineComponent({
      name: "OnLoad",
      setup() {
        useOnLoad({
          mountComponents,
          unmountComponents: (scope: HTMLElement) => {
            unmount([...scope.querySelectorAll<HTMLElement>("[data-component]")]);
          },
        });
      },
    }),
  )(document.documentElement);
})();
