export type Provides = {
  REBOOT: boolean
  GL_WORLD: {
    onResize: (width: number, height: number) => void
    addScene: (scene: any) => void
    removeScene: (scene: any) => void
  }
}
