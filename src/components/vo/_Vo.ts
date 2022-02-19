export abstract class ValueObject<T> {
  constructor(protected value: T) {}

  get() {
    return this.value
  }

  eq<Instance extends ValueObject<T>>(
    this: Instance,
    valueObject: Instance
  ) {
    return valueObject.get() === this.value
  }

  static of = function <T, Instance extends ValueObject<T>>(
    this: new (value: T) => Instance,
    value: ReturnType<Instance['get']>
  ) {
    return new this(value)
  }
}
