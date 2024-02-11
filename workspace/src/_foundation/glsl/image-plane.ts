import type { Mesh } from "@/_foundation/three";
import type { Point } from "@/_foundation/type";

export class ImagePlane {
  private _pos: Point;

  constructor(
    private _mesh: Mesh,
    private _el: HTMLElement,
  ) {
    this._pos = {
      x: 0,
      y: 0,
    };
  }

  updateY = (y: number) => {
    this._mesh.position.y = y - this._pos.y;
  };

  resize = (ww: number, wh: number) => {
    const bounds = this._el.getBoundingClientRect();

    const { u_mesh_size } = (this._mesh.material as any).uniforms; // TODO: 型チェックしたい

    const offsetX = bounds.left + bounds.width / 2 - ww / 2;
    const offsetY = bounds.top + bounds.height / 2 - wh / 2;

    this._pos = {
      x: offsetX,
      y: offsetY,
    };

    this._mesh.position.x = offsetX;
    this._mesh.position.y = -offsetY;

    u_mesh_size.value.x = bounds.width;
    u_mesh_size.value.y = bounds.height;

    this._mesh.scale.set(bounds.width, bounds.height, 1);
  };
}
