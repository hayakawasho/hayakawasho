import { defineComponent, useSlot, useDOMRef } from 'lake'
import type { Provides } from '@/const'

type Props = Provides

export default defineComponent<Props>({
  setup(_, { GL: _GL }) {
    // const { refs } = useDOMRef()
    // const { addChild } = useSlot()
    // GL.addScene()
  },
})
