import type { IScene } from '../functional/InitializeApp/sceneManager'
import { gsap } from '@/lib'

export default abstract class implements IScene {
  scope!: HTMLElement
  $$!: gsap.utils.SelectorFunc

  /**
   * DO NOT OVERWRITE
   */
  enter = async (scope = document.body) => {
    this.scope = scope
    this.$$ = gsap.utils.selector(this.scope)

    this.init()
  }

  /**
   * DO NOT OVERWRITE
   */
  leave = async () => {
    this.destroy()
  }

  protected init() {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected destroy() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
