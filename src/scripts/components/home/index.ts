import { defineComponent, useSlot, useDOMRef } from 'lake'
import Plane from './plane'
import type { Provides } from '@/const'
import { loadImage } from '@/libs'

type Props = Provides

export default defineComponent<Props>({
  setup(_, { GL_WORLD }) {
    const { refs } = useDOMRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild } = useSlot()

    const loadTasks = refs.plane.map(el => loadImage(el.dataset.src!))

    Promise.all(loadTasks)
      .then(() => {
        addChild(refs.plane, Plane, {
          GL_WORLD,
        })
      })
      .catch(() => {
        throw new Error('Could not load/decode image.')
      })
  },
})
