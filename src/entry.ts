import 'virtual:windi.css'
import {
  createApp,
  q,
  withSvelte,
  type RefElement,
  type IComponent,
  type ComponentContext,
} from 'lake'
import Cursor from '@/components/cursor'
import Gl from '@/components/gl'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Scene from '@/components/scene'
import type { Provides } from '@/const'
// import { TWEEN, EASE } from '@/libs'

const table: Record<string, IComponent> = {
  Noop,
  Observer: withSvelte(Observer),
  Cursor,
  Scene,
} as const

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = createApp()

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
            UNSET: (scope: RefElement) => unmount(q('[data-component]', scope)),
          })
        )
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  bootstrap(document.documentElement)

  // bootstrap(next, {
  //   namespace,
  //   ...url,
  // })
})
