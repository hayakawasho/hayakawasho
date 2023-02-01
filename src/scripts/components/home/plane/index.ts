import { defineComponent } from 'lake'
import { createPlane } from './createPlane'
import type { Provides } from '@/const'

type Props = Pick<Provides, 'GL_WORLD'> & { img: HTMLImageElement }

export default defineComponent<Props>({
  setup(el: HTMLImageElement, { GL_WORLD }) {
    const plane = createPlane(GL_WORLD.gl, el)

    GL_WORLD.addScene(plane)
  },
})
