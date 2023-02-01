import type { OGLRenderingContext } from 'ogl'

export type Provides = {
  REBOOT: boolean
  GL_WORLD: {
    gl: OGLRenderingContext
    onResize: (width: number, height: number) => void
    addScene: (scene: any) => void
    removeScene: (scene: any) => void
  }
}
