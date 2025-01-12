type ValueOf<T> = T[keyof T];

type Point = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

declare class Id<T extends string> {
  private IDENTITY: T;
}
