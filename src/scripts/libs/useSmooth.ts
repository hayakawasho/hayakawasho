import { useTick } from './useTick'
import { lerp } from '@/libs'
import { scrollPosYGetters, scrollRunningGetters } from '@/states/scroll'

export const useSmooth = (callback: (params: { target: number; current: number }) => void) => {
  let current = 0

  useTick(() => {
    if (scrollRunningGetters() === false) {
      return
    }

    const target = scrollPosYGetters()
    current = lerp(target, current, 0.1)

    callback({ target, current })
  })
}
