import { defineComponent, useSlot, useDOMRef, useUnmount } from 'lake'
import { Transform, Plane } from 'ogl'
import ImagePlane from './plane'
import type { Provides } from '@/const'

type Props = Provides

export default defineComponent<Props>({
  setup(_, { GL_WORLD }) {
    const { refs } = useDOMRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild } = useSlot()

    const planesGroup = new Transform()

    const geometry = new Plane(GL_WORLD.gl)

    addChild(refs.plane, ImagePlane, {
      gl: GL_WORLD.gl,
      planesGroup,
      geometry,
    })

    GL_WORLD.addScene(planesGroup)

    useUnmount(() => {
      GL_WORLD.removeScene(planesGroup)
    })
  },
})
