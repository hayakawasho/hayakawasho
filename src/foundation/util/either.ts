import { match } from "ts-pattern";

abstract class EitherClass {
  tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  flatMap<A, B, E>(op: (a: A) => Either<B, E>): Either<B, E> {
    return match(this as unknown as Either<A, E>)
      .with({ tag: "right" }, (res) => op(res.value))
      .with({ tag: "left" }, (res) => res)
      .exhaustive();
  }

  map<A, B, E>(op: (a: A) => B): Either<B, E> {
    return match(this as unknown as Either<A, E>)
      .with({ tag: "right" }, (res) => right<B, E>(op(res.value)))
      .with({ tag: "left" }, (res) => res)
      .exhaustive();
  }

  async asyncMap<A, B, E>(op: (a: A) => B): Promise<Either<B, E>> {
    return await match(this as unknown as Either<A, E>)
      .with({ tag: "right" }, async (res) => right<B, E>(await op(res.value)))
      .with({ tag: "left" }, async (res) => res)
      .exhaustive();
  }

  forEach<T, E>(op: (a: T) => void) {
    match(this as unknown as Either<T, E>)
      .with({ tag: "right" }, (res) => op(res.value))
      .with({ tag: "left" }, (_) => _)
      .exhaustive();
  }

  async toPromise<T, E>(): Promise<T> {
    return await match(this as unknown as Either<T, E>)
      .with({ tag: "right" }, (x) => Promise.resolve(x.value))
      .with({ tag: "left" }, (x) => Promise.reject(x.value))
      .exhaustive();
  }
}

class Right<T> extends EitherClass {
  tag: "right" = "right";
  value: T;

  constructor(val: T) {
    super("right");
    this.value = val;
  }
}

class Left<T> extends EitherClass {
  tag: "left" = "left";
  value: T;

  constructor(val: T) {
    super("err");
    this.value = val;
  }
}

export type Either<OK, ERR> = Left<ERR> | Right<OK>;

export function right<OK, ERR>(arg: OK): Either<OK, ERR> {
  return new Right(arg);
}

export function left<ERR, OK>(arg: ERR): Either<OK, ERR> {
  return new Left(arg);
}
