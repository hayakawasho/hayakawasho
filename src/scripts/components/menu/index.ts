import { defineComponent, useSlot, withSvelte } from 'lake'
import View from './view.svelte'

export default defineComponent({
  setup(el: HTMLElement) {
    const { addChild } = useSlot()

    addChild(el, withSvelte(View))

    return {
      //
    }
  },
})
