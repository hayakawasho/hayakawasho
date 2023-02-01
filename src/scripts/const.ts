import type { OGLRenderingContext, Transform } from 'ogl'

export type Provides = {
  REBOOT: boolean
  GL_WORLD: {
    gl: OGLRenderingContext
    onResize: (width: number, height: number) => void
    addScene: (scene: Transform) => void
    removeScene: (scene: Transform) => void
  }
}
