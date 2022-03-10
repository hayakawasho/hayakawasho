import { module } from 'modujs'

export default abstract class extends module {
  // $$ = gsap.utils.selector(this.el)

  /**
   * @abstract
   */
  init() {} // eslint-disable-line @typescript-eslint/no-empty-function

  /**
   * @abstract
   */
  destroy() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
