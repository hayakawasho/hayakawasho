import type { Point } from '@/_foundation/type';
import type { Mesh } from 'ogl';

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

  updatePos = (currentY: number) => {
    this.mesh.position.y = currentY - this.#pos.y;
  };

  onResize = (ww: number, wh: number) => {
    this.#rect = this.el.getBoundingClientRect();
    const { width, height, left, top } = this.#rect;
    const { u_mesh_size } = this.mesh.program.uniforms; // TODO: 型チェックしたい

    const xOffset = left + width / 2 - ww / 2;
    const yOffset = top + height / 2 - wh / 2;

    this.#pos = {
      x: xOffset,
      y: yOffset,
    };

    this.mesh.position.x = xOffset;
    this.mesh.position.y = -yOffset;

    u_mesh_size.value.x = width;
    u_mesh_size.value.y = height;

    this.mesh.scale.set(width, height, 1);
  };
}
