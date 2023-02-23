import { defineComponent, useSlot, useDomRef, useUnmount as __ } from 'lake'
import { Plane } from 'ogl'
import ImagePlane from './plane'
import type { Provides } from '@/const'

type Props = Provides

export default defineComponent<Props>({
  setup(_el, { glContext }) {
    const { refs } = useDomRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild, removeChild: _ } = useSlot()

    const geo = new Plane(glContext.gl)

    addChild(refs.plane, ImagePlane, {
      glContext,
      geo,
    })

    // useUnmount(() => {
    //
    // })
  },
})
