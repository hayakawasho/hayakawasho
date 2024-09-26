export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

export type ValueOf<T> = T[keyof T];

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : never;
