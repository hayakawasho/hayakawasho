import { defineComponent, useSlot, useDOMRef, useUnmount } from 'lake'
import { Transform } from 'ogl'
import Plane from './plane'
import type { Provides } from '@/const'

type Props = Provides

export default defineComponent<Props>({
  setup(_, { GL_WORLD }) {
    const { refs } = useDOMRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild } = useSlot()

    const planesGroup = new Transform()

    addChild(refs.plane, Plane, {
      gl: GL_WORLD.gl,
      planesGroup,
    })

    GL_WORLD.addScene(planesGroup)

    useUnmount(() => {
      GL_WORLD.removeScene(planesGroup)
    })
  },
})
