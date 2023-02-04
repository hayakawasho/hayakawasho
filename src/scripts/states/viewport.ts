import { ref } from 'lake'
import { map } from 'nanostores'
import type { Size } from '@/const'

type Parameters = Size

const { innerWidth, innerHeight } = window

const viewport = map<Parameters>({
  width: innerWidth,
  height: innerHeight,
})

export const viewportGetters = () => viewport.get()
export const viewportMutators = (update: Parameters) => viewport.set(update)
export const viewportRef = ref(viewport)
