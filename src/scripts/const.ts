import type { IUrlFull } from '@barba/core'
import type { OGLRenderingContext, Transform } from 'ogl'

export type Provides = {
  REBOOT:
    | false
    | ({
        namespace: string
      } & IUrlFull)
  GL_WORLD: {
    gl: OGLRenderingContext
    addScene: (scene: Transform) => void
    removeScene: (scene: Transform) => void
  }
}

export type Size = { width: number; height: number }
