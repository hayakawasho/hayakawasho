import { Plane, Program, Vec2, Mesh, Transform } from 'ogl'
import type { OGLRenderingContext } from 'ogl'
import { useTick, useWatch } from '@/libs'
import advectionFragment from './advection/advection.frag'
import { viewportRef } from '@/states/viewport'
import lineVertex from './advection/line.vert'
import colorFragment from './color.frag'
import { createShaderPass } from './createShaderPass'
import divergenceFragment from './divergence/divergence.frag'
import externalForceFragment from './external-force/externalForce.frag'
import faceVertex from './face.vert'
// import mouceVertex from './external-force/mouce.vert'
import poissonFragment from './poisson/poisson.frag'
import pressureFragment from './pressure/pressure.frag'

type Props = {
  gl: OGLRenderingContext
  addScene: (child: Transform) => void
}

export const useStableFluid = ({ gl, addScene: _ }: Props) => {
  const geometry = new Plane(gl)
  const program = new Program(gl, {
    vertex: faceVertex,
    fragment: colorFragment,
    uniforms: {},
  })

  const mesh = new Mesh(gl, {
    geometry,
    program,
  })

  // addScene(mesh)

  const advect = createShaderPass(gl, {
    vertex: lineVertex,
    fragment: advectionFragment,
    uniforms: {},
  })

  const divergence = createShaderPass(gl, {
    vertex: faceVertex,
    fragment: divergenceFragment,
    uniforms: {},
  })

  const externalForce = createShaderPass(gl, {
    vertex: ``,
    fragment: externalForceFragment,
    uniforms: {},
  })

  const poisson = createShaderPass(gl, {
    vertex: faceVertex,
    fragment: poissonFragment,
    uniforms: {},
  })

  const pressure = createShaderPass(gl, {
    vertex: faceVertex,
    fragment: pressureFragment,
    uniforms: {},
  })

  useTick(() => {
    //
  })

  useWatch(viewportRef, () => {
    //
  })
}
