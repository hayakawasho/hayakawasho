import { Object3D } from '@/_foundation/three';
import type { Point } from '@/_foundation/type';

export class GlObject extends Object3D {
  #pos: Point;

  constructor(protected el: HTMLElement) {
    super();

    this.#pos = {
      x: 0,
      y: 0,
    };
  }

  resize(ww: number, wh: number) {
    const bounds = this.el.getBoundingClientRect();
    const { left, top, width, height } = bounds;

    const offsetX = left + width / 2 - ww / 2;
    const offsetY = top + height / 2 - wh / 2;

    this.#pos = {
      x: offsetX,
      y: offsetY,
    };

    this.position.x = offsetX;
    this.position.y = -offsetY;

    return bounds;
  }

  updateY(current: number) {
    this.position.y = current - this.#pos.y;
  }
}
