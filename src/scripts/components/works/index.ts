import { defineComponent, useSlot, useDomRef, useMount, useUnmount } from 'lake'
import { Plane } from 'ogl'
import ImagePlane from './plane'
import type { GlobalContext } from '@/const'

type Props = GlobalContext

export default defineComponent({
  tagName: 'Works',
  setup(_el, props: Props) {
    const { glContext } = props

    const { refs } = useDomRef<{ plane: HTMLImageElement[] }>('plane')
    const { addChild, removeChild: _ } = useSlot()

    const geo = new Plane(glContext.gl)

    addChild(refs.plane, ImagePlane, {
      glContext,
      geo,
    })

    useMount(() => {
      if (props.initialLoad) {
        return
      }
    })

    useUnmount(() => {
      //
    })
  },
})
