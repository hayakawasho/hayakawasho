import { defineComponent } from 'lake'
import modularLoad from 'modularload'
import type { Provides } from '@/const'

type Props = {
  boot: () => void
  reboot: (scope: HTMLElement) => void
  cleanup: (scope: HTMLElement) => void
} & Provides['glWorld']

export default defineComponent<Props>({
  setup(_el, { boot, reboot, cleanup }) {
    boot()

    const load = new modularLoad({
      enterDelay: 300,
      transitions: {
        //
      },
    })

    load.on('loading', (_transition: string, oldContainer: HTMLElement) => {
      cleanup(oldContainer)
    })

    load.on(
      'loaded',
      (_transition: string, _oldContainer: HTMLElement, newContainer: HTMLElement) => {
        reboot(newContainer)
      }
    )
  },
})
