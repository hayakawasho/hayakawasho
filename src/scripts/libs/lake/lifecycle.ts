import { useUnmount } from 'lake'
import { taxi } from '../taxi'

export const useOnEnter = (callback: (payload: { from: any; to: any; trigger: any }) => void) => {
  taxi.on('NAVIGATE_END', callback)

  useUnmount(() => {
    taxi.off('NAVIGATE_END', callback)
  })
}

export const useOnLeave = (callback: (payload: { to: any; trigger: any }) => void) => {
  taxi.on('NAVIGATE_OUT', callback)

  useUnmount(() => {
    taxi.off('NAVIGATE_OUT', callback)
  })
}
