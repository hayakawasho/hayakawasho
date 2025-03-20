import { RepeatWrapping } from "three";
import { useWindowSize } from "../../../../../_libs/lake/useWindowSize";
import {
  LinearFilter,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
} from "../../../../../_libs/three";
import { globalStore } from "../../../../../_states";
import fragmentShader from "./noise.fs";
import vertexShader from "./noise.vs";

export function useRepeatNoise(canvas: HTMLCanvasElement, resolution: number, device: "pc" | "sp") {
  const { pc, mob } = canvas.dataset;

  const textureSrc = {
    pc: pc as string,
    sp: mob as string,
  };

  const loader = new TextureLoader();

  const texture = loader.load(textureSrc[device], (tex) => {
    tex.needsUpdate = true;
    tex.minFilter = LinearFilter;
    tex.generateMipmaps = false;
    tex.wrapS = tex.wrapT = RepeatWrapping;
  });

  const uniforms = {
    uRepeat: {
      value: {
        pc: (1100 / 198) * resolution * 2,
        sp: (1100 / 128) * resolution * 2,
      }[device],
    },
    uNoiseTexture: {
      value: texture,
    },
    uAlpha: {
      value: 0.08,
    },
  };

  const geo = new PlaneBufferGeometry(2, 2);
  const mat = new ShaderMaterial({
    fragmentShader,
    uniforms,
    vertexShader,
    depthTest: false,
    transparent: true,
    alphaTest: 0.5,
  });

  const noisePixelRatio = 0.5;
  const plane = new Mesh(geo, mat);

  const { ww, wh } = globalStore.getState().bounds;
  plane.scale.set(ww * noisePixelRatio, wh * noisePixelRatio, 1);

  useWindowSize(({ width, height }) => {
    plane.scale.x = width * noisePixelRatio;
    plane.scale.y = height * noisePixelRatio;
  });

  return plane;
}
