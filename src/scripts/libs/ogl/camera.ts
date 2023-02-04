import { Camera } from 'ogl'
import type { OGLRenderingContext } from 'ogl'

export const createCamera = (gl: OGLRenderingContext, width: number, height: number) => {
  const calc = (wh: number) => {
    const fov = 60
    const fovRad = fov * 0.5 * (Math.PI / 180)
    const distance = (wh * 0.5) / Math.tan(fovRad)

    return {
      fov,
      distance,
    }
  }

  const { fov, distance } = calc(height)
  const camera = new Camera(gl, {
    fov,
    aspect: width / height,
    near: 0.1,
    far: 1000,
  })

  camera.position.z = distance

  return {
    camera,
    calc,
  }
}
