import 'virtual:windi.css'
import 'ress'
import q from 'bianco.query'
import factory, { withSvelte } from 'lake'
import type { IComponent, ComponentContext } from 'lake'
import Loader from '@/components/loader'
import Noop from '@/components/noop.svelte'
// import Observer from '@/components/observer'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import type { LoaderProps } from '@/const'

function bootstrap() {
  const { component, unmount } = factory()

  const table: Record<string, IComponent> = {
    Noop: withSvelte(Noop, ''),
    Works,
    WorksDetail,
  } as const

  const mountComponents = (scope: HTMLElement, props: Record<string, unknown>) => {
    return q<HTMLElement>(`[data-component]`, scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop'
      try {
        const mount = component(table[`${name}`])
        acc.push(mount(el, props))
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  const html = document.documentElement

  component(Loader)(html, {
    onCreated: (provides?: Parameters<LoaderProps['onCreated']>[0]) =>
      mountComponents(html, {
        ...provides,
        initialLoad: true,
      }),
    onUpdated: (
      scope: Parameters<LoaderProps['onUpdated']>[0],
      provides: Parameters<LoaderProps['onUpdated']>[1]
    ) =>
      mountComponents(scope, {
        ...provides,
        initialLoad: false,
      }),
    onCleanup: (scope: Parameters<LoaderProps['onCleanup']>[0]) =>
      unmount(q(`[data-component]`, scope)),
  })
}

if (document.readyState !== 'loading') {
  bootstrap()
} else {
  document.addEventListener('DOMContentLoaded', bootstrap, false)
}
