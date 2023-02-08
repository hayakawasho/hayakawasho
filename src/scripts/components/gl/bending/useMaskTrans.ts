import { Plane, Program, Mesh } from 'ogl'
import type { Provides } from '@/const'
import fragment from './frag.glsl'
import { TWEEN } from '@/libs'
import vertex from './vert.glsl'
import { useWatch } from '@/libs/lake'
import { viewportRef } from '@/states/viewport'

type Props = Pick<Provides['glWorld'], 'gl' | 'addScene'>

export const useMaskTrans = ({ gl, addScene }: Props) => {
  const state = {
    animating: false,
  }

  const geometry = new Plane(gl)
  // const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0])
  // const uvs = new Float32Array([0, 0, 2, 0, 0, 2])

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uProgress: { value: 0 },
      uPower: { value: 0 },
      uOut: { value: true },
    },
  })

  const mesh = new Mesh(gl, {
    geometry,
    program,
  })

  addScene(mesh)

  useWatch(viewportRef, payload => {
    console.log(payload)
  })

  return {
    up: () => {
      //
    },
    down: () => {
      //
    },
  }
}
