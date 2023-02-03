import { useUnmount } from 'lake'
import type { Ref } from 'lake'
import type { MapStore, WritableAtom } from 'nanostores'

export const useWatch = <T extends object>(
  refState: Ref<WritableAtom<T>> | Ref<MapStore<T>>,
  callback: (payload: T) => void
) => {
  const unbind = refState.value.listen(() => {
    const send = refState.value.get()
    callback(send)
  })

  useUnmount(() => {
    unbind()
  })
}
