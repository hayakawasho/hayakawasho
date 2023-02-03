import 'virtual:windi.css'
import barba from '@barba/core'
import { createApp, q, withSvelte } from 'lake'
import type { IComponent, ComponentContext } from 'lake'
import Cursor from '@/components/cursor'
import Gl from '@/components/gl'
import Home from '@/components/home'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import { TWEEN, EASE } from '@/libs'

const table: Readonly<Record<string, IComponent>> = {
  Noop,
  Home,
  Observer: withSvelte(Observer),
  Cursor,
}

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = createApp()

  const glWorld = component(Gl)(document.getElementById('js-gl')!)

  const bootstrap = (scope: HTMLElement, { reboot = false }) => {
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

  bootstrap(document.documentElement, {})

  barba.init({
    schema: {
      prefix: 'data-pjax',
      wrapper: 'wrap',
      container: 'view',
    },
    transitions: [
      {
        name: 'default',
        sync: false,
        leave(data) {
          return new Promise(resolve => {
            const current = data.current.container

            TWEEN.tween(current, 1, EASE.expoOut)
              .opacity(0)
              .onComplete(() => {
                unmount(q('[data-component]', current))
              })
              .play()

            setTimeout(() => {
              resolve(true)
            }, 500)
          })
        },
        enter(data) {
          const next = data.next.container

          TWEEN.serial(
            TWEEN.prop(next).opacity(0),
            TWEEN.tween(next, 1, EASE.expoOut).opacity(1)
          ).play()

          bootstrap(next, {
            reboot: true,
          })
        },
      },
    ],
  })
})
