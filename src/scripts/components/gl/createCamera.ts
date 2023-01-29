import { Camera } from 'ogl'
import type { OGLRenderingContext } from 'ogl'

export const createCamera = (gl: OGLRenderingContext, aspect: number) => {
  const camera = new Camera(gl, {
    fov: 45,
    aspect,
    near: 0.1,
    far: 100,
  })

  camera.position.z = 50

  return {
    camera,
  }
}
