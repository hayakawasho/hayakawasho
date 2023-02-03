import { defineComponent, useDOMRef } from 'lake'
import { useStableFluid } from './fluid/useStableFluid'
import { useGlWorld } from './useGlWorld'

export default defineComponent({
  setup(el) {
    const { width, height } = el.getBoundingClientRect()
    const { refs } = useDOMRef<{ canvas: HTMLCanvasElement }>('canvas')

    const { gl, addScene, ...rest } = useGlWorld(refs.canvas, width, height)

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
