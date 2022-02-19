class Utils {
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

  static timeout(promise: Promise<void>[], ms: number): Promise<void[] | void> {
    return Promise.race([Promise.all(promise), this.wait(ms)])
  }

  static async nextTick(): Promise<void> {
    await this.waitFrame(1)
  }

  static zeroPadding(num: number | string, length: number) {
    return `${num}`.padStart(length, '0')
  }
}

export { Utils }
