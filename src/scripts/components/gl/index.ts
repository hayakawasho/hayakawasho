import { defineComponent, useDOMRef } from 'lake'
import { useStableFluid } from './fluid/useStableFluid'
import { useGl } from './useGl'

export default defineComponent({
  setup(el) {
    const { width, height } = el.getBoundingClientRect()
    const { refs } = useDOMRef<{ canvas: HTMLCanvasElement }>('canvas')

    const { gl, addScene, ...rest } = useGl(refs.canvas, width, height)

    useStableFluid({
      gl,
      addScene,
    })

    return {
      gl,
      addScene,
      ...rest,
    } as const
  },
})
