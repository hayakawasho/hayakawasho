import { Camera } from 'ogl'
import type { OGLRenderingContext } from 'ogl'

export const createCamera = (
  gl: OGLRenderingContext,
  width: number,
  height: number,
  fov: number,
  dist: number
) => {
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
