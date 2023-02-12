import type { OGLRenderingContext, Transform } from 'ogl'

export type Provides = {
  reload: boolean
  glWorld: {
    gl: OGLRenderingContext
    addScene: (scene: Transform) => void
    removeScene: (scene: Transform) => void
  }
}

export type Size = { width: number; height: number }
