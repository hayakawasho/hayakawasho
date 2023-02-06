import { defineComponent, useSlot, useDOMRef } from 'lake'
import { Transform, Plane } from 'ogl'
import ImagePlane from './plane'
import type { Provides } from '@/const'
import { useOnEnter, useOnLeave } from '@/libs/lake'

type Props = Provides

export default defineComponent<Props>({
  setup(_, { GL_WORLD }) {
    const { gl, addScene, removeScene } = GL_WORLD

    const { refs } = useDOMRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild } = useSlot()

    const planesGroup = new Transform()
    const geometry = new Plane(gl)

    addChild(ImagePlane, refs.plane, {
      gl,
      planesGroup,
      geometry,
    })

    addScene(planesGroup)

    useOnEnter(() => {
      //
    })

    useOnLeave(() => {
      removeScene(planesGroup)
    })
  },
})
