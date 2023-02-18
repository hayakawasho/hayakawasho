import { useMount } from 'lake'
import { Plane, Program, Mesh } from 'ogl'
import type { Provides } from '@/const'
import { TWEEN, EASE } from '@/libs'
import fragment from './frag.glsl'
import { useWatch } from '@/libs/lake'
import vertex from './vert.glsl'
import { viewportRef } from '@/states/viewport'

type Props = Pick<Provides['glContext'], 'gl' | 'addScene'>

export const useMaskTrans = ({ gl, addScene }: Props) => {
  const state = {
    animating: false,
  }

  const geo = new Plane(gl)

  // geo.addAttribute('uv', new Float32Array([0, 0, 2, 0, 0, 2]))
  // geo.addAttribute('position', new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]))

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
    geometry: geo,
    program,
  })

  useMount(() => {
    addScene(mesh)
  })

  useWatch(viewportRef, payload => {
    console.log(payload)
  })

  return {
    maskUp: () => {
      state.animating = true

      const { uProgress } = program.uniforms

      TWEEN.serial(
        TWEEN.tween(uProgress, 0.5, EASE.linear, { value: 1 }),
        TWEEN.tween(uProgress, 0.5, EASE.linear, { value: 0 })
      )
        .onComplete(() => {
          state.animating = false
        })
        .play()
    },
    maskDown: () => {
      state.animating = true

      const { uProgress } = program.uniforms

      TWEEN.serial(
        TWEEN.tween(uProgress, 0.5, EASE.linear, { value: 0 }),
        TWEEN.tween(uProgress, 0.5, EASE.linear, { value: 1 })
      )
        .onComplete(() => {
          state.animating = false
        })
        .play()
    },
  }
}
