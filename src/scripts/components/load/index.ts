import { defineComponent } from 'lake'
import modularLoad from 'modularload'
import type { Provides } from '@/const'

type Props = {
  componentDidMount: () => void
  componentDidUpdate: (scope: HTMLElement) => void
  cleanup: (scope: HTMLElement) => void
} & Provides['glContext']

export default defineComponent<Props>({
  setup(_el, { componentDidMount, componentDidUpdate, cleanup }) {
    componentDidMount()

    const sceneLoader = new modularLoad({
      enterDelay: 0,
      exitDelay: 0,
      loadedDelay: 0,
      transitions: {
        //
      },
    })

    sceneLoader.on('loading', (_transition: string, oldContainer: HTMLElement) => {
      cleanup(oldContainer)
    })

    sceneLoader.on(
      'loaded',
      (_transition: string, _oldContainer: HTMLElement, newContainer: HTMLElement) => {
        componentDidUpdate(newContainer)
      }
    )
  },
})
