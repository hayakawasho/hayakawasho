import { defineComponent, useIntersectionWatch } from 'lake'
import { Mesh, Plane, Program, Texture } from 'ogl'
import type { Provides } from '@/const'
import { useSmooth, useWatch } from '@/libs/lake'
import { viewportRef } from '@/states/viewport'

type Props = Pick<Provides['GL_WORLD'], 'gl'>

export default defineComponent<Props>({
  setup(el: HTMLImageElement, { gl }) {
    //
  },
})
