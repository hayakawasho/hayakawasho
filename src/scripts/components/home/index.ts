import { defineComponent, useSlot, useDOMRef } from 'lake'
import Plane from './plane'
import type { Provides } from '@/const'

type Props = Provides

export default defineComponent<Props>({
  setup(_, { GL_WORLD }) {
    const { refs } = useDOMRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild } = useSlot()

    addChild(refs.plane, Plane, {
      GL_WORLD,
    })
  },
})
