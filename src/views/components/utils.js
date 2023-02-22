// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const zeroPadding = (num, p = 2) => {
  return num.toString().padStart(p, '0')
}
