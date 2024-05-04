import { Object3D } from "./three";
import type { Point, Size } from "@/_foundation/type";

type UpdateCache = {
  left?: number;
  top?: number;
  offset?: number;
  width?: number;
  height?: number;
};

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
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      offset: 0,
    };
  }

  updateCache = (newCache: UpdateCache) => {
    const old = this.cache;

    this.cache = {
      ...old,
      ...newCache,
    };
  };

  resize(size: Size) {
    const bounds = this.el.getBoundingClientRect();
    const { left, top, width, height } = bounds;
    this.updateCache({ left, top, width, height });

    const offsetX = left - size.width / 2 + width / 2;
    const offsetY = -(this.cache.offset + top) + size.height / 2 - height / 2;

    this.#pos = {
      x: offsetX,
      y: offsetY,
    };

    this.position.x = this.#pos.x;
    this.position.y = this.#pos.y;
  }

  update({ x = 0, y = 0 }: { x?: number; y?: number }) {
    this.position.x = x + this.#pos.x;
    this.position.y = y + this.#pos.y;
  }
}
