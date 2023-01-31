import { defineComponent } from 'lake'
import { pick } from 'remeda'
import { createPlane } from './createPlane'
import type { Provides } from '@/const'

type Props = Pick<Provides, 'GL_WORLD'>

export default defineComponent<Props>({
  setup(el: HTMLImageElement, { GL_WORLD }) {
    const rect = el.getBoundingClientRect()
    const { src } = el.dataset

    const plane = createPlane(src!, pick(rect, ['width', 'height', 'left', 'top']))

    GL_WORLD.addScene(plane)
  },
})
