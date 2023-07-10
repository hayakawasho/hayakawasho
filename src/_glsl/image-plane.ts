import type { Mesh } from "ogl";

export class ImagePlane {
  constructor(private mesh: Mesh) {}

  update = (update: {
    rect: DOMRect;
    currentY: number;
    ww: number;
    wh: number;
  }) => {
    const { rect, currentY, wh, ww } = update;
    const { top, width, height, left } = rect;

    this.mesh.scale.set(width, height);

    const pos = {
      x: left + width / 2 + -(ww / 2),
      y: top + height / 2 + -(wh / 2),
    };

    this.mesh.position.y = currentY - pos.y;
  };
}
