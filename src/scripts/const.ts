export type Provides = {
  REBOOT: boolean
  GL: {
    onResize: (width: number, height: number) => void
    addScene: () => void
    removeScene: () => void
  }
}
