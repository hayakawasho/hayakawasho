import { defineComponent, useMount } from "lake";
import { RepeatWrapping } from "three";
// import { useMediaQuery } from "../../../../../_libs/lake/useMediaQuery";
import { useWindowSize } from "../../../../../_libs/lake/useWindowSize";
import {
  LinearFilter,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
} from "../../../../../_libs/three";
import { globalStore } from "../../../../../_states";
// import type { DefineComponentContext } from "../../../../../const";
// import fragmentShader from "./noise.frag";
// import vertexShader from "./noise.vert";

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
        value: 1,
      },
    };

    const geo = new PlaneBufferGeometry(2, 2);
    const mat = new ShaderMaterial({
      fragmentShader: `precision mediump float;

uniform sampler2D uNoiseTexture;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec4 noise = texture2D(uNoiseTexture, uv);
  noise.a = uAlpha;

  gl_FragColor = noise;
}`,
      uniforms,
      vertexShader: `precision mediump float;

varying vec2 vUv;
uniform float uRepeat;

void main() {
  vUv = uv * uRepeat;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
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
