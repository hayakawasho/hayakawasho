import { WINDOW_RESIZE } from 'const'
import { eventbus } from 'lib/eventbus'

export default function () {
  const setVh = (wh: number) => {
    const vh = wh * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setVh(window.innerHeight)

  const ro = new ResizeObserver(([entry]) => {
    const rect = entry.contentRect
    const windowH = window.innerHeight

    setVh(windowH)

    eventbus.emit(WINDOW_RESIZE, {
      screenW: rect.width,
      screenH: rect.height,
      windowH,
    })
  })

  ro.observe(document.getElementById('js-viewportRef') as HTMLElement)
}
