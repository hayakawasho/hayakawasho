import type { IScene } from "@/client/sceneManager";
import { selector } from "@/foundation/util/selector";

export default abstract class implements IScene {
  scope!: HTMLElement;
  $$!: typeof selector;

  /**
   * DO NOT OVERWRITE
   */
  enter = async (scope = document.body) => {
    this.scope = scope;
    this.$$ = selector;

    this.init();
  };

  /**
   * DO NOT OVERWRITE
   */
  leave = async () => {
    this.destroy();
  };

  protected init() {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected destroy() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
