import { defineComponent, useSlot, useDOMRef } from 'lake'
import { Plane } from 'ogl'
import ImagePlane from './plane'
import type { Provides } from '@/const'
import { useOnEnter, useOnLeave } from '@/libs/lake'

type Props = Provides

export default defineComponent<Props>({
  setup(_, { glWorld, unmount }) {
    const { refs } = useDOMRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild } = useSlot()

    const geometry = new Plane(glWorld.gl)

    addChild(ImagePlane, refs.plane, {
      glWorld,
      geometry,
    })

    //----------------------------------------------------------------

    useOnLeave(() => {
      unmount()
    })

    useOnEnter(() => {
      //
    })
  },
})
