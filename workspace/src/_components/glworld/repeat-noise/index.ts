import { defineComponent, useMount } from "lake";
import { RepeatWrapping } from "three";
import {
  PlaneBufferGeometry,
  ShaderMaterial,
  Mesh,
  TextureLoader,
  LinearFilter,
} from "@/_gl/three";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { ParentScene } from "@/_foundation/type";

type Props = ParentScene & {
  dpr: number;
};

export default defineComponent({
  name: "RepeatNoise",
  setup(canvas: HTMLCanvasElement, context: Props) {
    const { addScene, removeScene, dpr } = context;

    const { device } = useMediaQueryContext();

    const noisePixelRatio = 0.5;
    const { pc, mob } = canvas.dataset;

    const loader = new TextureLoader();
    const texture = loader.load(
      {
        pc: pc!,
        sp: mob!,
      }[device],
      tex => {
        tex.needsUpdate = true;
        tex.minFilter = LinearFilter;
        tex.generateMipmaps = false;
        tex.wrapS = tex.wrapT = RepeatWrapping;
      },
    );

    const uniforms = {
      u_repeat: {
        value: {
          pc: (1100 / 198) * dpr * 2,
          sp: (1100 / 128) * dpr * 2,
        }[device],
      },
      u_noiseTex: {
        value: texture,
      },
      u_alpha: {
        value: 0.06,
      },
    };

    const noisePlane = new Mesh(
      new PlaneBufferGeometry(2, 2),
      new ShaderMaterial({
        fragmentShader: fragment,
        uniforms,
        vertexShader: vertex,
        depthTest: false,
        transparent: true,
        alphaTest: 0.5,
      }),
    );

    const [ww, wh] = useWindowSizeContext(p => {
      noisePlane.scale.x = p.width * noisePixelRatio;
      noisePlane.scale.y = p.height * noisePixelRatio;
    });

    useMount(() => {
      noisePlane.scale.set(ww.value * noisePixelRatio, wh.value * noisePixelRatio, 1);
      addScene(noisePlane);

      return () => {
        removeScene(noisePlane);
      };
    });
  },
});
