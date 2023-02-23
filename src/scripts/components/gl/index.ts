import { defineComponent, useDomRef } from 'lake'
// import { useFluid } from './fluid/useFluid'
import { useMaskTrans } from './mask/useMaskTrans'
import { useGl } from './useGl'

export default defineComponent({
  setup(el) {
    const { width, height } = el.getBoundingClientRect()
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>('canvas')

    const webgl = useGl(refs.canvas, width, height)
    const { maskUp, maskDown } = useMaskTrans({
      ...webgl,
      ww: width,
      wh: height,
    })
    // useFluid(webgl)

    return {
      ...webgl,
      maskUp,
      maskDown,
    } as const
  },
})
