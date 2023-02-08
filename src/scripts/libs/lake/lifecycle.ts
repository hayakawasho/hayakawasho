import { useUnmount } from 'lake'
import { H } from '../highway'

type Payload = {
  from: HTMLElement
  to: HTMLElement
  trigger: HTMLElement | string
  location: object
}

export const useBeforeEnter = (callback: (payload: Omit<Payload, 'from'>) => void) => {
  H.on('NAVIGATE_IN', callback)

  useUnmount(() => {
    H.off('NAVIGATE_IN', callback)
  })
}

export const useOnEnter = (callback: (payload: Payload) => void) => {
  H.on('NAVIGATE_END', callback)

  useUnmount(() => {
    H.off('NAVIGATE_END', callback)
  })
}

export const useOnLeave = (callback: (payload: Omit<Payload, 'to'>) => void) => {
  H.on('NAVIGATE_OUT', callback)

  useUnmount(() => {
    H.off('NAVIGATE_OUT', callback)
  })
}
