import { mousePosMutators, mousemoveRunningMutators } from '@/states/mouse'

export const createMouseHandler = () => {
  let timer: number

  const onMousemove = (e: MouseEvent) => {
    clearTimeout(timer)

    const posXY = {
      x: e.clientX,
      y: e.clientY,
    }

    mousePosMutators(posXY)
    mousemoveRunningMutators(true)

    timer = window.setTimeout(() => {
      mousemoveRunningMutators(false)
    }, 100)
  }

  return { onMousemove }
}
