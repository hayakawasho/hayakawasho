import type { Point } from '@/_foundation/type';

export class ImagePlane {
  private _rect: DOMRect;
  private _pos: Point;

  constructor(private _mesh: THREE.Mesh, private _el: HTMLElement) {
    this._rect = this._el.getBoundingClientRect();
    this._pos = {
      x: 0,
      y: 0,
    };
  }

  updatePos = (currentY: number) => {
    this._mesh.position.y = currentY - this._pos.y;
  };

  onResize = (ww: number, wh: number) => {
    this._rect = this._el.getBoundingClientRect();
    const bounds = this._rect;
    const { u_mesh_size } = (this._mesh.material as any).uniforms; // TODO: 型チェックしたい

    const xOffset = bounds.left + bounds.width / 2 - ww / 2;
    const yOffset = bounds.top + bounds.height / 2 - wh / 2;

    this._pos = {
      x: xOffset,
      y: yOffset,
    };

    this._mesh.position.x = xOffset;
    this._mesh.position.y = -yOffset;

    u_mesh_size.value.x = bounds.width;
    u_mesh_size.value.y = bounds.height;

    this._mesh.scale.set(bounds.width, bounds.height, 1);
  };
}
