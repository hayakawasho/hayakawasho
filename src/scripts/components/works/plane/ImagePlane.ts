import type { Mesh } from 'ogl'

export class ImagePlane {
  #cache: {
    ww: number
    wh: number
    rect: DOMRect
  }

  constructor(private mesh: Mesh, private el: HTMLImageElement) {
    this.#cache = {
      ww: 0,
      wh: 0,
      rect: el.getBoundingClientRect(),
    }
  }

  update = () => {
    const { rect, ww, wh } = this.#cache

    this.mesh.scale.x = rect.width
    this.mesh.scale.y = rect.height

    const x = -ww * 0.5 + rect.width * 0.5 + rect.left
    const y = wh * 0.5 - rect.height * 0.5 - rect.top

    this.mesh.position.set(x, y, this.mesh.position.z)
  }

  resize = (ww: number, wh: number) => {
    this.#cache = {
      ...this.#cache,
      rect: this.el.getBoundingClientRect(),
      ww,
      wh,
    }
  }
}
