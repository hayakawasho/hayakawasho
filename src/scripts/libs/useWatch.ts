import { useUnmount } from 'lake'
import type { Ref } from 'lake'
import type { MapStore, WritableAtom } from 'nanostores'

export const useWatch = <T extends object>(
  ref: Ref<WritableAtom<T>> | Ref<MapStore<T>>,
  callback: (params: T) => void
) => {
  const unbind = ref.value.subscribe(() => {
    const send = ref.value.get()
    callback(send)
  })

  useUnmount(() => {
    unbind()
  })
}
