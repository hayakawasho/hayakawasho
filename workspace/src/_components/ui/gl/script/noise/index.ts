import { defineComponent, useMount } from "lake";
import { RepeatWrapping } from "three";
import {
  LinearFilter,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
} from "../../../../../_libs/three";
import { globalStore } from "../../../../../_states";
// import { useMediaQuery } from "../../../../../_libs/lake/useMediaQuery";
import { useWindowSize } from "../../../../../_libs/lake/useWindowSize";
// import type { DefineComponentContext } from "../../../../../const";
import fragmentShader from "./noise.frag";
import vertexShader from "./noise.vert";

export default defineComponent({
  name: "RepeatNoise",
  setup(
    canvas: HTMLCanvasElement,
    props: {
      dpr: number;
      addScene: (scene: Mesh) => void;
      removeScene: (scene: Mesh) => void;
    },
  ) {
    const { addScene, removeScene, dpr } = props;

    // const { device } = useMediaQuery();

    const { pc, mob } = canvas.dataset;
    const textureSrc = {
      pc: pc as string,
      sp: mob as string,
    };
    const loader = new TextureLoader();
    const texture = loader.load(textureSrc["pc"], (tex) => {
      tex.needsUpdate = true;
      tex.minFilter = LinearFilter;
      tex.generateMipmaps = false;
      tex.wrapS = tex.wrapT = RepeatWrapping;
    });

    const uniforms = {
      uRepeat: {
        value: {
          pc: (1100 / 198) * dpr * 2,
          sp: (1100 / 128) * dpr * 2,
        }["pc"],
      },
      uNoiseTexture: {
        value: texture,
      },
      uAlpha: {
        value: 0.06,
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
    const noisePlane = new Mesh(geo, mat);

    const { ww, wh } = globalStore.getState().bounds;
    noisePlane.scale.set(ww * noisePixelRatio, wh * noisePixelRatio, 1);

    useWindowSize(({ width, height }) => {
      noisePlane.scale.x = width * noisePixelRatio;
      noisePlane.scale.y = height * noisePixelRatio;
    });

    useMount(() => {
      addScene(noisePlane);

      return () => {
        removeScene(noisePlane);
      };
    });
  },
});
