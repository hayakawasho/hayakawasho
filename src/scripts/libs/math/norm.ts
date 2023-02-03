import { map } from './map'

export const norm = (val: number, min: number, max: number) => {
  return map(val, min, max, 0, 1)
}
