import 'virtual:windi.css'
import About from '@/components/about'
import Cursor from '@/components/cursor'
import barba from '@barba/core'
import Gl from '@/components/gl'
import { createApp, q, withSvelte } from 'lake'
import Home from '@/components/home'
import type { IComponent, ComponentContext } from 'lake'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import type { Provides } from '@/const'
import { TWEEN, EASE } from '@/libs'

const table: Record<string, IComponent> = {
  Noop,
  Observer: withSvelte(Observer),
  Cursor,
  Home,
  Works,
  WorksDetail,
  About,
} as const

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = createApp()

  const glWorld = component(Gl)(document.getElementById('js-gl')!)

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
        once(_data) {
          bootstrap(document.documentElement)
        },
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
          const { namespace, container: next, url } = data.next

          TWEEN.serial(
            TWEEN.prop(next).opacity(0),
            TWEEN.tween(next, 1, EASE.expoOut).opacity(1)
          ).play()

          bootstrap(next, {
            namespace,
            ...url,
          })
        },
      },
    ],
  })
})
