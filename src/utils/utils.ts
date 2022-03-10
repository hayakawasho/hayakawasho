export type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown
}
  ? U
  : T

const timeoutPromise = (timeout: number) => {
  return new Promise((_resolve, reject) => {
    window.setTimeout(
      () => reject(new Error(`timed out after ${timeout} ms`)),
      timeout
    )
  })
}

export class Util {
  static wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      window.setTimeout(() => resolve(), ms)
    })
  }

  static async waitFrame(frame: number): Promise<void> {
    const promiseArray: void[] = []
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
      promiseArray.push(await waitFunc())
    }

    return Promise.all(promiseArray).then(() => {
      console.log('waitFrame finish')
      console.timeEnd('waitFrame time')
      console.log('waitFrame frameCount', frameCount)
    })
  }

  static timeout(promise: Promise<unknown>, ms: number) {
    return Promise.race([promise, timeoutPromise(ms)])
  }

  static async nextTick(): Promise<void> {
    await Util.waitFrame(1)
  }

  static zeroPadding(num: number | string, length: number) {
    return `${num}`.padStart(length, '0')
  }
}
