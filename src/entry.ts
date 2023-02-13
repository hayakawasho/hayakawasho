import 'virtual:windi.css'
import About from '@/components/about'
import Cursor from '@/components/cursor'
import $ from 'bianco.query'
import Gl from '@/components/gl'
import { factory, withSvelte, type IComponent, type ComponentContext } from 'lake'
import Home from '@/components/home'
import Load from '@/components/load'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import type { Provides } from '@/const'

const init = () => {
  const { component, unmount } = factory()

  const table: Record<string, IComponent> = {
    Noop,
    Observer: withSvelte(Observer),
    Cursor,
    Home,
    Works,
    WorksDetail,
    About,
  } as const

  const glWorld = component(Gl)(document.getElementById('js-glWorld')!)

  const bootstrap = (scope: HTMLElement, initialLoad = true) => {
    return $<HTMLElement | SVGElement>(`[data-component]`, scope).reduce<ComponentContext[]>(
      (acc, el) => {
        const name = el.dataset.component || 'Noop'
        try {
          const mount = component(table[`${name}`])
          acc.push(
            mount(el, {
              initialLoad,
              glWorld: glWorld.current as Provides['glWorld'],
            })
          )
        } catch (error) {
          console.error(error)
        }
        return acc
      },
      []
    )
  }

  const html = document.documentElement

  component(Load)(html, {
    boot: () => bootstrap(html),
    reboot: (scope: HTMLElement) => bootstrap(scope, false),
    cleanup: (scope: HTMLElement) => unmount($(`[data-component]`, scope)),
    glWorld: glWorld.current as Provides['glWorld'],
  })
}

if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init, {
    once: true,
  })
}
