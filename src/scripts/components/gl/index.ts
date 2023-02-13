import { defineComponent, useDomRef } from 'lake'
// import { useFluid } from './fluid/useFluid'
// import { useMaskTrans } from './bending/useMaskTrans'
import { useGl } from './useGl'

export default defineComponent({
  setup(el) {
    const { width, height } = el.getBoundingClientRect()
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>('canvas')

    const { gl, addScene, ...rest } = useGl(refs.canvas, width, height)
    // const { up, down } = useMaskTrans({ gl, addScene })
    // useFluid({ gl, addScene })

    return {
      gl,
      addScene,
      ...rest,
      // up,
      // down,
    } as const
  },
})
