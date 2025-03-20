import { Object3D } from "../_libs/three";
import { globalStore } from "../_states";

export class GlObject extends Object3D {
  #pos = {
    x: 0,
    y: 0,
  };
  cache;

  constructor(protected el: HTMLElement) {
    super();

    this.cache = this.#setCache();
    this.#setPosition();
  }

  #setCache = (width?: number, height?: number) => {
    const bounds = this.el.getBoundingClientRect();
    const {
      scroll: { currentY },
      bounds: { ww, wh },
    } = globalStore.getState();

    return {
      bounds,
      centerX: bounds.left + bounds.width * 0.5,
      centerY: bounds.top + bounds.height * 0.5,
      offset: currentY,
      windowW: width || ww,
      windowH: height || wh,
    };
  };

  resize = (width?: number, height?: number) => {
    this.cache = this.#setCache(width, height);
    this.#setPosition();
  };

  #setPosition() {
    const { centerX, centerY, windowH, windowW } = this.cache;
    this.#pos.x = centerX - windowW * 0.5;
    this.#pos.y = -(centerY - windowH * 0.5);

    this.position.x = this.#pos.x;
    this.position.y = this.#pos.y;
  }

  updateY = (current = 0) => {
    this.position.y = current - this.cache.offset + this.#pos.y;
  };

  updateX = (current = 0) => {
    this.position.x = current + this.#pos.x;
  };
}
