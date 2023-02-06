import type { Transition } from '@unseenco/taxi'
import { useUnmount } from 'lake'
import { taxi } from '../taxi'

type Payload = Parameters<Transition['enter']>[0] & {
  from: Parameters<Transition['leave']>[0]['from']
}

export const useBeforeEnter = (callback: (payload: Omit<Payload, 'from'>) => void) => {
  taxi.on('NAVIGATE_IN', callback)

  useUnmount(() => {
    taxi.off('NAVIGATE_IN', callback)
  })
}

export const useOnEnter = (callback: (payload: Payload) => void) => {
  taxi.on('NAVIGATE_END', callback)

  useUnmount(() => {
    taxi.off('NAVIGATE_END', callback)
  })
}

export const useOnLeave = (callback: (payload: Omit<Payload, 'to'>) => void) => {
  taxi.on('NAVIGATE_OUT', callback)

  useUnmount(() => {
    taxi.off('NAVIGATE_OUT', callback)
  })
}
