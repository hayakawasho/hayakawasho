import { Object3D } from "./three";
import type { Point } from "@/_foundation/type";

export class GlObject extends Object3D {
  #pos: Point;
  cache;
  protected order: number;

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

    const order = this.el.dataset.glOrder || 1;
    this.order = Number(order);
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

  setSize({
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
    this.updateCache({ height, left, top, width, x, y });

    const xOffset = x + left - newValues.width * 0.5 + width * 0.5;
    const yOffset = -(y + top) + newValues.height * 0.5 - height * 0.5;

    this.position.x = xOffset;
    this.position.y = yOffset;

    this.#pos.x = xOffset;
    this.#pos.y = yOffset;
  }

  update({ x = 0, y = 0 }: { x?: number; y?: number }) {
    this.position.x = x + this.#pos.x;
    this.position.y = y + this.#pos.y;
  }
}
