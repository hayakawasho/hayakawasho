import { Object3D, Texture } from "../_libs/three";
import { globalStore } from "../_states";
import { loadAsset } from "../_utils/loader";

class GlObject extends Object3D {
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

  #setCache = () => {
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
      windowW: ww,
      windowH: wh,
    };
  };

  resize = () => {
    this.cache = this.#setCache();
    this.#setPosition();
  };

  #setPosition() {
    const { centerX, centerY, windowH, windowW } = this.cache;
    this.#pos.x = centerX - windowW * 0.5;
    this.#pos.y = -(centerY - windowH * 0.5);

    this.position.x = this.#pos.x;
    this.position.y = this.#pos.y;
  }

  updatePosition = (current = 0) => {
    this.position.y = current - this.cache.offset + this.#pos.y;
  };
}

class GlImage extends GlObject {
  loadTexture = (src: string, onLoad: (texture: Texture) => void = () => {}) => {
    const texture = new Texture();

    loadAsset<HTMLImageElement>(src).then((result) => {
      texture.image = result;
      onLoad(texture);
    });

    return texture;
  };
}

export { GlObject, GlImage };
