import { atom } from 'nanostores'

const y = atom(window.scrollY)

export const posYAccessors = () => y.get()

export const posYMutators = (update: number) => y.set(update)
