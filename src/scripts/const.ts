import type { OGLRenderingContext, Transform } from 'ogl'

export type Provides = {
  reboot:
    | false
    | {
        namespace: string
      }
  glWorld: {
    gl: OGLRenderingContext
    addScene: (scene: Transform) => void
    removeScene: (scene: Transform) => void
  }
  flush: () => void
}

export type Size = { width: number; height: number }
