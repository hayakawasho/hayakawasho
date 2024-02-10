import { create, withSvelte } from 'lake';
import Cursor from '~/_features/cursor.svelte';
import Load from './_features/load';
import NavMenu from './_features/menu';
import Noop from './_features/noop.svelte';
import Home from './_features/page.home';
// import Scrollbar from './_features/scrollbar.svelte';
import Works from './_features/page.works';
import Single from './_features/page.works-single';
import { qsa } from './_foundation/utils';
import type { IComponent, ComponentContext } from 'lake';

(() => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Cursor: withSvelte(Cursor, 'Cursor'),
    Home,
    NavMenu,
    Noop: withSvelte(Noop, 'Noop'),
    // // Scrollbar: withSvelte(Scrollbar, 'Scrollbar'),
    Single,
    Works,
  } as const;

  const mountComponents = (scope: HTMLElement, props: Record<string, unknown>) => {
    return qsa<HTMLElement>('[data-component]', scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop';
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
      unmount(qsa<HTMLElement>('[data-component]', scope));
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
})();
