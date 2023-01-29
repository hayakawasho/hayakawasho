import { map } from 'nanostores'

const viewportState = map({
  w: window.innerWidth,
  h: window.innerHeight,
})

export const viewportAccessors = () => viewportState.get()

export const viewportMutators = (update: { w?: number; h?: number }) => {
  const prev = viewportAccessors()

  viewportState.set({
    ...prev,
    ...update,
  })
}
