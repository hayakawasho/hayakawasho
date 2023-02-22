import { defineComponent, useSlot, useDomRef } from 'lake'
import { Plane } from 'ogl'
import ImagePlane from './plane'
import type { Provides } from '@/const'

type Props = Provides

export default defineComponent<Props>({
  setup(_el, { glContext }) {
    const { refs } = useDomRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild } = useSlot()

    const geometry = new Plane(glContext.gl)

    addChild(refs.plane, ImagePlane, {
      glContext,
      geometry,
    })
  },
})
