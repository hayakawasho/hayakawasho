import { defineComponent } from 'lake'
import modularLoad from 'modularload'
import type { Provides } from '@/const'

type Props = {
  boot: () => void
  set: (scope: HTMLElement) => void
  unset: (scope: HTMLElement) => void
} & Provides['glWorld']

export default defineComponent<Props>({
  setup(_el, { boot, set, unset }) {
    boot()

    const load = new modularLoad({
      enterDelay: 300,
      transitions: {
        //
      },
    })

    load.on('loading', (_transition: string, oldContainer: HTMLElement) => {
      unset(oldContainer)
    })

    load.on(
      'loaded',
      (_transition: string, _oldContainer: HTMLElement, newContainer: HTMLElement) => {
        set(newContainer)
      }
    )
  },
})
