import type { RefElement } from 'lake'
import { debounce } from '@/libs'
import { viewportMutators } from '@/states/viewport'

export const createResizeObserver = (el: RefElement) => {
  new ResizeObserver(
    debounce(([entry]) => {
      const { width, height } = entry.contentRect
      viewportMutators({ width, height })
    }, 200)
  ).observe(el)
}
