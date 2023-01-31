import { map, atom } from 'nanostores'

type Parameters = {
  x: number
  y: number
}

const xy = map<Parameters>({
  x: 0,
  y: 0,
})

export const mousePosGetters = () => xy.get()
export const mousePosMutators = (update: Parameters) => xy.set(update)

const running = atom(false)
export const mousemovingGetters = () => running.get()
export const mousemovingMutators = (update: boolean) => running.set(update)
