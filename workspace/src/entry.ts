import 'virtual:windi.css';
import 'ress';
import { create, withSvelte } from 'lake';
import Archives from './_components/archives';
import Cursor from './_components/cursor.svelte';
import Home from './_components/home';
import Load from './_components/load';
import NavMenu from './_components/menu';
import Noop from './_components/noop.svelte';
import Scrollbar from './_components/scrollbar.svelte';
import Single from './_components/single';
import Works from './_components/works';
import { wideQuery, mediaPrint } from './_foundation/env';
import { qsa } from './_foundation/utils';
import type { IComponent, ComponentContext } from 'lake';

const init = () => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Archives,
    Cursor: withSvelte(Cursor, 'Cursor'),
    Home,
    NavMenu,
    Noop: withSvelte(Noop, 'Noop'),
    Scrollbar: withSvelte(Scrollbar, 'Scrollbar'),
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
};

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

const onChangeBreakpoint = () => location.reload();

wideQuery.addEventListener('change', onChangeBreakpoint);
mediaPrint.addEventListener('change', e => {
  e.matches
    ? wideQuery.removeEventListener('change', onChangeBreakpoint)
    : wideQuery.addEventListener('change', onChangeBreakpoint);
});

if (process.env.NODE_ENV === 'development') {
  const Stats = await ((await import('https://cdn.skypack.dev/stats.js.fps?dts')) as any).default;
  const stats = new Stats();
  stats.showPanel(0);

  document.body.appendChild(stats.dom);

  const loop = () => {
    stats.update();
    requestAnimationFrame(loop);
  };

  loop();
}
