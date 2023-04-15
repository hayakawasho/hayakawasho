import { useUnmount } from 'lake'

const FPS_60_SEC = 1000 / 60

export const useTick = (callback: (payload: { timestamp: number; timeRatio: number }) => void) => {
  let then = 0

  const loop = (timestamp: number) => {
    rafId = requestAnimationFrame(loop)

    const now = timestamp

    if (then === 0) {
      then = now
      return
    }

    const dTime = now - then
    const timeRatio = Math.round((dTime / FPS_60_SEC) * 1000) * 0.001

    callback({
      timestamp,
      timeRatio,
    })

    then = now
  }

  let rafId = requestAnimationFrame(loop)

  useUnmount(() => {
    cancelAnimationFrame(rafId)
  })
}
