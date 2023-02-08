import type { Mesh } from 'ogl'
import type { Cache } from './'

export class ImagePlane {
  constructor(private mesh: Mesh) {}

  update = (update: Cache) => {
    const offset = update.rect.top
    const moveY = -update.currentY + offset

    this.mesh.scale.x = update.rect.width
    this.mesh.scale.y = update.rect.height

    const x = -update.ww * 0.5 + update.rect.width * 0.5 + update.rect.left
    const y = update.wh * 0.5 - update.rect.height * 0.5 - moveY

    this.mesh.position.set(x, y, this.mesh.position.z)
  }
}
