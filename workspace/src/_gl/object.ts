import { Object3D } from "./three";
import type { Point } from "~/_foundation/type";

export class GlObject extends Object3D {
  #pos: Point;
  protected cache;

  constructor(protected el: HTMLElement) {
    super();

    this.#pos = {
      x: 0,
      y: 0,
    };

    this.cache = {
      height: 0,
      left: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    };
  }

  protected updateCache = (newCache: {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
  }) => {
    const old = this.cache;

    this.cache = {
      ...old,
      ...newCache,
    };
  };

  resize({
    x = 0,
    y = 0,
    ...newValues
  }: {
    x?: number;
    y?: number;
    width: number;
    height: number;
  }) {
    const bounds = this.el.getBoundingClientRect();
    const { left, top, width, height } = bounds;

    const xOffset = x + left - newValues.width * 0.5 + width * 0.5;
    const yOffset = -(y + top) + newValues.height * 0.5 - height * 0.5;

    this.position.x = xOffset;
    this.position.y = yOffset;

    this.#pos.x = xOffset;
    this.#pos.y = yOffset;
    this.updateCache({ height, left, top, width, x, y });
  }

  update({ x = 0, y = 0 }: { x?: number; y?: number }) {
    this.position.x = x + this.#pos.x;
    this.position.y = y + this.#pos.y;
  }
}
