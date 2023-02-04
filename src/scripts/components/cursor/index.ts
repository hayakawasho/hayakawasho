import { defineComponent } from 'lake'
import { useTick } from '@/libs/lake'
import { mousePosGetters, mousemoveRunningGetters } from '@/states/mouse'

export default defineComponent({
  setup(_el: HTMLElement) {
    useTick(() => {
      if (mousemoveRunningGetters() === false) {
        return
      }

      const { x, y } = mousePosGetters()
      console.log(x, y)
    })
  },
})
