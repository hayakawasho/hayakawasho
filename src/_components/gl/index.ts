import { defineComponent, useDomRef } from 'lake'
import { useGl } from './use-gl'

export default defineComponent({
  setup(el) {
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    const { width, height } = el.getBoundingClientRect()
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>('canvas')

    const webgl = useGl(refs.canvas, width, height, dpr)

    return {
      ...webgl,
    }
  },
  tagName: 'Gl',
})
