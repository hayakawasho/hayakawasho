import { atom } from 'nanostores'

const posY = atom(0)
export const scrollPosYGetters = () => posY.get()
export const scrollPosYMutators = (update: number) => posY.set(update)

const deltaY = atom(0)
export const scrollDeltaYMutators = (update: number) => deltaY.set(update)

const running = atom(false)
export const scrollRunningGetters = () => running.get()
export const scrollRunningMutators = (update: boolean) => running.set(update)
