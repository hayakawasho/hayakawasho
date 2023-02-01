export const loadImage = (url: string, crossOrigin: '' | 'anonymous' | 'use-credentials' = '') => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.crossOrigin = crossOrigin

    return img
      .decode()
      .then(() => {
        return resolve(img)
      })
      .catch(e => {
        return reject(e)
      })
  })
}
