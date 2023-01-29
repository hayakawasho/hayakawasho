import { defineComponent, useDOMRef } from 'lake'
import { useGl } from './useGl'

export default defineComponent({
  setup(el) {
    const { refs } = useDOMRef<{ canvas: HTMLCanvasElement }>('canvas')

    const { width, height } = el.getBoundingClientRect()
    const { resize, addScene } = useGl(refs.canvas, width, height)

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      resize(width, height)
    })

    ro.observe(el)

    return {
      addScene,
    }
  },
})
