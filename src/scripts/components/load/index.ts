import { defineComponent } from 'lake'
import modularLoad from 'modularload'
import type { Provides } from '@/const'

type Props = {
  componentDidMount: () => void
  componentDidUpdate: (scope: HTMLElement) => void
  cleanup: (scope: HTMLElement) => void
} & Provides['glWorld']

export default defineComponent<Props>({
  setup(_el, { componentDidMount, componentDidUpdate, cleanup }) {
    componentDidMount()

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
        componentDidUpdate(newContainer)
      }
    )
  },
})
