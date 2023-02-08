import 'virtual:windi.css'
import About from '@/components/about'
import { createApp, q, withSvelte, type IComponent, type ComponentContext } from 'lake'
import Cursor from '@/components/cursor'
import Gl from '@/components/gl'
import Home from '@/components/home'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import type { Provides } from '@/const'

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = createApp()

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

  const bootstrap = (scope: HTMLElement, reboot: Provides['reboot'] = false) => {
    return q('[data-component]', scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop'
      try {
        const mount = component(table[`${name}`])
        acc.push(
          mount(el, {
            reboot,
            glWorld: glWorld.current,
            unmount: unmount(q('[data-component]:not([data-no-reload])')),
          })
        )
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  bootstrap(document.documentElement)
})
