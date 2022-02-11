export const lerp = (start: number, end: number, p: number) => {
  return start + (end - start) * p
}

export const map = (
  val: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) => {
  if (val <= inputMin) return outputMin
  if (val >= inputMax) return outputMax

  const p = (outputMax - outputMin) / (inputMax - inputMin)

  return (val - inputMin) * p + outputMin
}

export const norm = (val: number, min: number, max: number) => {
  return map(val, min, max, 0, 1)
}

export const hypot = (n: number, m: number) => {
  return Math.sqrt(n * n + m * m)
}

export const deg2rad = (n: number) => {
  return (n * Math.PI) / 180
}

export const rad2deg = (n: number) => {
  return (180 * n) / Math.PI
}
