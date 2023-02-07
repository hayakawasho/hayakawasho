import { useTick } from './tick'
import { lerp } from '@/libs/math'
import { scrollPosYGetters, scrollRunningGetters } from '@/states/scroll'

export const useScrollTween = (
  callback: (payload: { target: number; current: number }) => void
) => {
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
