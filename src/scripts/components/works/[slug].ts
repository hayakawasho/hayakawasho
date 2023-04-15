import { defineComponent, useSlot, useDomRef, useMount, useUnmount } from 'lake'
import type { GlobalContext } from '@/const'

type Props = GlobalContext

export default defineComponent({
  tagName: 'Works.[slug]',
  setup(_el, props: Props) {
    const { glContext } = props

    const { refs } = useDomRef()
    const { addChild } = useSlot()

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
