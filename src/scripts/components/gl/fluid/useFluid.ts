import {
  Plane,
  Program,
  Mesh,
  RenderTarget,
  Geometry,
  Texture,
  Vec2,
  NormalProgram,
  Post,
} from 'ogl'
import type { Provides } from '@/const'
import { createAdvection } from './advection'
import { useTick, useWatch } from '@/libs/lake'
import colorFragment from './color.frag'
import { createDivergence } from './divergence'
import { viewportRef } from '@/states/viewport'
import { createExternalForce } from './external-force'
import faceVertex from './face.vert'
import { createPoisson } from './poisson'
import { createPressure } from './pressure'
import { createViscous } from './viscous'

type Props = Pick<Provides['GL_WORLD'], 'addScene' | 'gl'>

export const useFluid = ({ gl, addScene: _ }: Props) => {
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

  const advection = createAdvection() // 移流
  const divergence = createDivergence() // 発散
  const externalForce = createExternalForce() // 外力

  const poisson = createPoisson() // ポアソン
  const pressure = createPressure() // 圧力

  const viscous = createViscous() // 粘性

  useTick(_payload => {
    //
  })

  useWatch(viewportRef, _payload => {
    //
  })
}
