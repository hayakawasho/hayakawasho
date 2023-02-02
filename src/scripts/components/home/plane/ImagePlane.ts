import type { Mesh } from 'ogl'

export class ImagePlane {
  cache: any

  constructor(public mesh: Mesh, public img: HTMLImageElement) {
    this.cache = {
      ww: 0,
      wh: 0,
      rect: DOMRect,
    }
  }

  update() {
    const rect = this.img.getBoundingClientRect()

    this.mesh.scale.x = rect.width
    this.mesh.scale.y = rect.height

    const x = -this.cache.ww * 0.5 + rect.width * 0.5 + rect.left
    const y = this.cache.wh * 0.5 - rect.height * 0.5 - rect.top

    this.mesh.position.set(x, y, this.mesh.position.z)
  }

  resize = (size: { width: number; height: number }) => {
    this.cache = {
      ...this.cache,
      rect: this.img.getBoundingClientRect(),
      ww: size.width,
      wh: size.height,
    }
  }
}
