import { defineComponent, useDomRef } from 'lake'
import { useGl } from './useGl'

export default defineComponent({
  tagName: 'Gl',
  setup(el) {
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    const { width, height } = el.getBoundingClientRect()
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>('canvas')

    const webgl = useGl(refs.canvas, width, height, dpr)

    return {
      ...webgl,
    } as const
  },
})
