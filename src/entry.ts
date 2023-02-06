import 'virtual:windi.css'
import About from '@/components/about'
import Cursor from '@/components/cursor'
import { createApp, q, withSvelte } from 'lake'
import Gl from '@/components/gl'
import type { IComponent, ComponentContext } from 'lake'
import Home from '@/components/home'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import type { Provides } from '@/const'
// import { TWEEN, EASE } from '@/libs'

const table: Record<string, IComponent> = {
  Noop,
  Observer: withSvelte(Observer),
  Cursor,
  Home,
  Works,
  WorksDetail,
  About,
} as const

const { component, unmount } = createApp()

document.addEventListener('DOMContentLoaded', () => {
  const glWorld = component(Gl)(document.getElementById('js-glWorld')!)

  const bootstrap = (scope: HTMLElement, reboot: Provides['REBOOT'] = false) => {
    return q('[data-component]', scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop'
      try {
        const mount = component(table[`${name}`])
        acc.push(
          mount(el, {
            REBOOT: reboot,
            GL_WORLD: glWorld.current,
          })
        )
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  bootstrap(document.documentElement)

  // unmount(q('[data-component]', current))

  // bootstrap(next, {
  //   namespace,
  //   ...url,
  // })
})

export { unmount }
