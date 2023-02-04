import { Mesh, Plane, Program } from 'ogl'
import type { OGLRenderingContext } from 'ogl'

export const createShaderPass = (
  gl: OGLRenderingContext,
  material: {
    vertex: string
    fragment: string
    uniforms: Record<string, any>
  }
) => {
  const geometry = new Plane(gl)
  const program = new Program(gl, material)

  const mesh = new Mesh(gl, {
    geometry,
    program,
  })

  return mesh
}
