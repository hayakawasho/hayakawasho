import type { OGLRenderingContext, Transform } from 'ogl'

export type Provides = {
  initialLoad: boolean
  glWorld: {
    gl: OGLRenderingContext
    addScene: (scene: Transform) => void
    removeScene: (scene: Transform) => void
    maskUp: () => void
    maskDown: () => void
  }
}

export type Size = { width: number; height: number }
