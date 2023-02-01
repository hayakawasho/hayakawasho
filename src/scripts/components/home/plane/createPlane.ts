import { Mesh, Plane, Program, Texture } from 'ogl'
import type { OGLRenderingContext } from 'ogl'
import fragment from './frag.glsl'
import { viewportGetters } from '@/states/viewport'

import vertex from './vert.glsl'

export const createPlane = (gl: OGLRenderingContext, img: HTMLImageElement) => {
  const { width: ww, height: wh } = viewportGetters()
  const rect = img.getBoundingClientRect()

  const texture = new Texture(gl)

  img.decode().then(() => {
    texture.image = img
  })

  const geometry = new Plane(gl)

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTexture: { value: texture },
      uImageAspect: { value: img.naturalWidth / img.naturalHeight },
      uPlaneAspect: { value: rect.width / rect.height },
    },
  })

  const plane = new Mesh(gl, {
    geometry,
    program,
  })

  plane.scale.x = rect.width
  plane.scale.y = rect.height

  const x = -ww * 0.5 + rect.width * 0.5 + rect.left
  const y = wh * 0.5 - rect.height * 0.5 - rect.top

  plane.position.set(x, y, plane.position.z)

  return plane
}
