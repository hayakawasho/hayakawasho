import { defineComponent, useDOMRef } from 'lake'
import { useGl } from './useGl'

export default defineComponent({
  setup(el) {
    const { width, height } = el.getBoundingClientRect()
    const { refs } = useDOMRef<{ canvas: HTMLCanvasElement }>('canvas')

    const glWorldContext = useGl(refs.canvas, width, height)

    return {
      ...glWorldContext,
    } as const
  },
})
