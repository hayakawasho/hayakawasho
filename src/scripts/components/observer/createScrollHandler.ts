import { scrollDeltaYMutators, scrollPosYMutators, scrollRunningMutators } from '@/states/scroll'

export const createScrollHandler = () => {
  let timer: number
  let scrollPosY = 0

  const onScroll = () => {
    clearTimeout(timer)

    const y = window.scrollY
    const diff = scrollPosY - y
    scrollPosY = y

    scrollPosYMutators(scrollPosY)
    scrollDeltaYMutators(diff)
    scrollRunningMutators(true)

    timer = window.setTimeout(() => {
      scrollRunningMutators(false)
    }, 300)
  }

  return { onScroll }
}
