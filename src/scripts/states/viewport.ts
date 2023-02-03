import { ref, readonly } from 'lake'
import { map } from 'nanostores'

type Parameters = {
  width: number
  height: number
}

const { innerWidth, innerHeight } = window

const viewport = map<Parameters>({
  width: innerWidth,
  height: innerHeight,
})

export const viewportGetters = () => viewport.get()
export const viewportMutators = (update: Parameters) => viewport.set(update)
export const viewportRef = ref(viewport)
