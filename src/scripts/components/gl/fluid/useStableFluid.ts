import { Plane, Program, Mesh } from 'ogl'
import type { Provides } from '@/const'
import { useTick, useWatch } from '@/libs/lake'
import advectionFragment from './advection/advection.frag'
import { createShaderPass } from '@/libs/ogl'
import lineVertex from './advection/line.vert'
import { viewportRef } from '@/states/viewport'
import colorFragment from './color.frag'
import divergenceFragment from './divergence/divergence.frag'
import externalForceFragment from './external-force/externalForce.frag'
import faceVertex from './face.vert'
// import mouceVertex from './external-force/mouce.vert'
import poissonFragment from './poisson/poisson.frag'
import pressureFragment from './pressure/pressure.frag'

type Props = Pick<Provides['GL_WORLD'], 'addScene' | 'gl'>

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
