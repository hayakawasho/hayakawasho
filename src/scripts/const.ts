export type Provides = {
  REBOOT: boolean
  GL: Readonly<{
    addScene: () => void
    removeScene: () => void
  }>
}
