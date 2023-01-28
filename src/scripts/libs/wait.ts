export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    window.setTimeout(() => resolve(), ms)
  })
}

const waitFrame = async (frame: number): Promise<void> => {
  const promises: void[] = []
  let frameCount = 0

  console.log('waitFrame start')
  console.time('waitFrame time')

  const waitFunc = (): Promise<void> => {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        frameCount++

        resolve()
      })
    })
  }

  for (let i = 0; i < frame; i++) {
    promises.push(await waitFunc())
  }

  return Promise.all(promises).then(() => {
    console.log('waitFrame finish')
    console.timeEnd('waitFrame time')
    console.log('waitFrame frameCount', frameCount)
  })
}

export const nextTick = async () => await waitFrame(1)
