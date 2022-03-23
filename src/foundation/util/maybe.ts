import { match } from "ts-pattern";

abstract class MaybeClass {
  tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  flatMap<A, B>(op: (a: A) => Maybe<B>): Maybe<B> {
    return match(this as Maybe<A>)
      .with({ tag: "just" }, (res) => op(res.value))
      .with({ tag: "nothing" }, (_) => nothing<B>())
      .exhaustive();
  }

  map<A, B>(op: (a: A) => B): Maybe<B> {
    return match(this as Maybe<A>)
      .with({ tag: "just" }, (res) => just(op(res.value)))
      .with({ tag: "nothing" }, (_) => nothing<B>())
      .exhaustive();
  }

  async asyncMap<A, B>(op: (a: A) => B): Promise<Maybe<B>> {
    return await match(this as Maybe<A>)
      .with({ tag: "just" }, async (res) => just(await op(res.value)))
      .with({ tag: "nothing" }, async (_) => nothing<B>())
      .exhaustive();
  }

  forEach<T>(op: (a: T) => void): void {
    match(this as Maybe<T>)
      .with({ tag: "just" }, (res) => op(res.value))
      .with({ tag: "nothing" }, (_) => _)
      .exhaustive();
  }
}

class Just<T> extends MaybeClass {
  tag: "just" = "just";
  value: T;

  constructor(val: T) {
    super("just");
    this.value = val;
  }
}

class Nothing extends MaybeClass {
  tag: "nothing" = "nothing";

  constructor() {
    super("nothing");
  }
}

export type Maybe<T> = Just<T> | Nothing;

export function just<T>(arg: T): Maybe<T> {
  return new Just(arg);
}

export function nothing<T>(): Maybe<T> {
  return new Nothing();
}
