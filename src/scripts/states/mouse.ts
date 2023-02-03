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
export const mousemoveRunningGetters = () => running.get()
export const mousemoveRunningMutators = (update: boolean) => running.set(update)
