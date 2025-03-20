import { LinearFilter, Texture } from "../_libs/three";
import { assetLoader } from "../_utils/loader";

export function createTexture(src: string) {
  return new Promise<Texture>((resolve, reject) => {
    const texture = new Texture();
    texture.needsUpdate = true;
    texture.minFilter = LinearFilter;
    texture.generateMipmaps = false;

    try {
      assetLoader<HTMLImageElement>(src).then((result) => {
        texture.image = result;
        return resolve(texture);
      });
    } catch (error) {
      return reject(error);
    }
  });
}
