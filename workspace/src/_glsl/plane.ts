import type { Point } from "@/_foundation/type";
import type { Mesh } from "ogl";

export class ImagePlane {
  #rect: DOMRect;
  #pos: Point;

  constructor(private mesh: Mesh, private el: HTMLElement) {
    this.#rect = this.el.getBoundingClientRect();
    this.#pos = {
      x: 0,
      y: 0,
    };
  }

  updatePos(currentY: number) {
    this.mesh.position.y = currentY - this.#pos.y;
  }

  resize(ww: number, wh: number) {
    this.#rect = this.el.getBoundingClientRect();
    const { width, height, left, top } = this.#rect;

    this.mesh.scale.set(width, height, 1);

    const xOffset = left + width / 2 - ww / 2;
    const yOffset = top + height / 2 - wh / 2;

    this.#pos = {
      x: xOffset,
      y: yOffset,
    };

    this.mesh.position.set(xOffset, -yOffset, this.mesh.position.z);
  }
}
