import { defineComponent, useIntersectionWatch } from 'lake'
import { Mesh, Plane, Program, Texture } from 'ogl'
import type { Provides } from '@/const'
import { useScrollTween, useWatch } from '@/libs/lake'
import { viewportRef } from '@/states/viewport'

type Props = Pick<Provides['glWorld'], 'gl'>

export default defineComponent<Props>({
  setup(el: HTMLImageElement, { gl }) {
    //
  },
})
