export abstract class Model<T> {
  protected constructor(data: T) {
    this.value = data
  }

  protected value: T

  toJSON = () => {
    return {
      ...this.value,
    }
  }
}
