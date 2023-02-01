import { Camera } from 'ogl'
import type { OGLRenderingContext } from 'ogl'

export const createCamera = (gl: OGLRenderingContext, width: number, height: number) => {
  const fov = 60
  const fovRad = fov * 0.5 * (Math.PI / 180)
  const dist = (height * 0.5) / Math.tan(fovRad)

  const camera = new Camera(gl, {
    fov,
    aspect: width / height,
    near: 0.1,
    far: 1000,
  })

  camera.position.z = dist

  return {
    camera,
  }
}
