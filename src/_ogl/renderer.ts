import { Renderer } from 'ogl'

export const createRenderer = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  dpr: number
) => {
  const renderer = new Renderer({
    alpha: true,
    // premultipliedAlpha: true,
    canvas,

    dpr,
  })

  renderer.setSize(width, height)
  renderer.gl.clearColor(0, 0, 0, 0)

  return {
    renderer,
  }
}
