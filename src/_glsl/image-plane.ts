import type { Mesh } from "ogl";

export class ImagePlane {
  constructor(private mesh: Mesh) {}

  update = (update: {
    rect: DOMRect;
    currentY: number;
    ww: number;
    wh: number;
  }) => {
    const offset = update.rect.top;
    const moveY = -update.currentY + offset;

    this.mesh.scale.x = update.rect.width;
    this.mesh.scale.y = update.rect.height;

    const x = -update.ww / 2 + update.rect.width / 2 + update.rect.left;
    const y = update.wh / 2 - update.rect.height / 2 - moveY;

    this.mesh.position.set(x, y, this.mesh.position.z);
  };
}
