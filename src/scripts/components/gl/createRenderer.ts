import { Renderer } from 'ogl'

export const createRenderer = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  dpr: number
) => {
  const renderer = new Renderer({
    dpr,
    alpha: true,
    premultipliedAlpha: true,
    canvas,
  })

  renderer.setSize(width, height)

  const { gl } = renderer
  gl.clearColor(0, 0, 0, 0)

  return {
    gl,
    renderer,
  }
}
