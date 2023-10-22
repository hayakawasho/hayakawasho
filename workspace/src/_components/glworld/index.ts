import { getGPUTier } from "detect-gpu";
import { defineComponent, useDomRef, ref } from "lake";
import { Transform, Renderer, Camera } from "ogl";
import { useTick } from "@/_foundation/hooks";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";
import type { TierResult } from "detect-gpu";

const dpr = {
  pc: 1.5,
  sp: 1.5,
};

export default defineComponent({
  name: "GlWorld",
  setup(el, { mq }: Pick<AppContext, "mq">) {
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>("canvas");
    const { height, width } = el.getBoundingClientRect();

    const gpuTier = ref<TierResult | null>(null);

    getGPUTier().then((result) => {
      gpuTier.value = result;
    });

    const state = {
      resizing: false,
    };

    const renderer = new Renderer({
      alpha: true,
      canvas: refs.canvas,
      dpr: Math.min(window.devicePixelRatio, dpr[mq.value]),
      height,
      width,
    });

    const fov = 60;
    const calcCamDistance = (h: number) => {
      const vFov = (fov * Math.PI) / 180;
      const fovRad = vFov * 0.5;
      return (h * 0.5) / Math.tan(fovRad);
    };

    const camera = new Camera(renderer.gl, {
      aspect: width / height,
      far: 2000,
      fov,
      near: 0.1,
    });

    camera.position.z = calcCamDistance(height);

    const scene = new Transform();

    useWindowSize(({ aspect, wh, ww }) => {
      state.resizing = true;

      renderer.setSize(ww, wh);
      camera.perspective({ aspect });
      camera.position.z = calcCamDistance(wh);

      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }

      renderer.render({
        camera,
        scene,
      });
    });

    const addScene = (child: Transform) => {
      scene.addChild(child);
    };

    const removeScene = (child: Transform) => {
      scene.removeChild(child);
    };

    return {
      addScene,
      gl: renderer.gl,
      removeScene,
    };
  },
});
