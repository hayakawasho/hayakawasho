import { defineComponent, useDOMRef } from 'lake'
import { useGl } from './useGl'
import { viewportGetters } from '@/states/viewport'

export default defineComponent({
  setup() {
    const { width, height } = viewportGetters()
    const { refs } = useDOMRef<{ canvas: HTMLCanvasElement }>('canvas')
    const { onResize, addScene, removeScene } = useGl(refs.canvas, width, height)

    return {
      onResize,
      addScene,
      removeScene,
    }
  },
})
