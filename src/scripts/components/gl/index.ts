import { defineComponent, useDOMRef } from 'lake'
import { useGl } from './useGl'

export default defineComponent({
  setup(el) {
    const { width, height } = el.getBoundingClientRect()
    const { refs } = useDOMRef<{ canvas: HTMLCanvasElement }>('canvas')
    const { onResize, addScene, removeScene } = useGl(refs.canvas, width, height)

    return {
      onResize,
      addScene,
      removeScene,
    }
  },
})
