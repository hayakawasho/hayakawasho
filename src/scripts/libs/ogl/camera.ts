import { Camera } from 'ogl'
import type { OGLRenderingContext } from 'ogl'
import { deg2rad } from '@/libs/math'

export const createCamera = (gl: OGLRenderingContext, w: number, h: number) => {
  const FOV = 45

  const calc = (h: number) => {
    const fovRad = deg2rad(FOV * 0.5)
    const dist = (h * 0.5) / Math.tan(fovRad)

    return {
      dist,
    }
  }

  const { dist } = calc(h)
  const camera = new Camera(gl, {
    fov: FOV,
    aspect: w / h,
    near: 0.1,
    far: 10000,
  })

  camera.position.z = dist

  return {
    camera,
    calc,
  }
}
