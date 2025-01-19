import { RepeatWrapping } from "three";
import { defineComponent, useMount } from "lake";
import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";
import globalStore from "../../../_stores";
import { useMediaQuery } from "../../../_stores/mq";
import { useWindowSize } from "../../../_stores/window-size";
import { PlaneBufferGeometry, ShaderMaterial, Mesh, TextureLoader, LinearFilter } from "../../../_utils/three";
import type { ParentScene } from "../../../_utils/types";

type ComponentProps = ParentScene & {
  dpr: number;
};

export default defineComponent({
  name: "RepeatNoise",
  setup(canvas: HTMLCanvasElement, context: ComponentProps) {
    const { addScene, removeScene, dpr } = context;

    const { device } = useMediaQuery();

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
          pc: (1100 / 198) * dpr * 2,
          sp: (1100 / 128) * dpr * 2,
        }[device],
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
    noisePlane.scale.set(globalStore.bounds.ww * noisePixelRatio, globalStore.bounds.wh * noisePixelRatio, 1);

    useWindowSize(({ windowSize }) => {
      noisePlane.scale.x = windowSize.width * noisePixelRatio;
      noisePlane.scale.y = windowSize.height * noisePixelRatio;
    });

    useMount(() => {
      addScene(noisePlane);

      return () => {
        removeScene(noisePlane);
      };
    });
  },
});
