const _conditionalReturn = (value: number, func: any) =>
  value || value === 0 ? func(value) : func

export function mapRange(
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  V: number
) {
  const inRange = inMax - inMin
  const outRange = outMax - outMin

  return _conditionalReturn(
    V,
    (p: number) => outMin + (((p - inMin) / inRange) * outRange || 0)
  )
}

export function normalize(inMin: number, inMax: number, V: number) {
  return mapRange(inMin, inMax, 0, 1, V)
}

export function lerp(V: number, start = 0, end = 1) {
  return start + (end - start) * V
}
