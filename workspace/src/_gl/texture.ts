import { Texture, LinearFilter } from "@/_gl/three";

export const createTexture = () => {
  const tex = new Texture();
  tex.needsUpdate = true;
  tex.minFilter = LinearFilter;
  tex.generateMipmaps = false;

  return tex;
};
