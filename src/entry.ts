import 'virtual:windi.css'
import barba from '@barba/core'
import { createApp, q, withSvelte } from 'lake'
import type { IComponent } from 'lake'
import Gl from '@/components/gl/index.svelte'
import Noop from '@/components/noop'
import { TWEEN, EASE } from '@/libs'

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = createApp()

  const table: Record<string, IComponent> = {
    Noop,
    Gl: withSvelte(Gl),
  }

  const bootstrap = (targets: HTMLElement[], { reboot = false }) => {
    targets.forEach(el => {
      const name = el.dataset.component || 'Noop'

      try {
        const mount = component(table[`${name}`])
        mount(el, { reboot })
      } catch (error) {
        console.error(error)
      }
    })
  }

  bootstrap(q('[data-component]'), {
    reboot: false,
  })

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

          bootstrap(q('[data-component]', next), {
            reboot: true,
          })
        },
      },
    ],
  })
})
