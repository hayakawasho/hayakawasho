import { getGPUTier } from "detect-gpu";
import { useWindowSize } from "../../_libs/lake/useWindowSize";
import { globalStore } from "../../_states";
import { PerspectiveCamera, Scene, WebGLRenderer } from "../three";
import type { Object3D } from "../three";
import { useTick } from "./useTick";

export function useThree(canvas: HTMLCanvasElement, dpr: number) {
  const { width, height } = canvas.getBoundingClientRect();

  const renderer = new WebGLRenderer({
    alpha: true,
    canvas,
  });

  renderer.setSize(width, height);
  renderer.setClearColor(13092551, 0);
  renderer.setPixelRatio(dpr);

  if (dpr > 1) {
    getGPUTier().then((result) => {
      console.log("getGPUTier:", { ...result });

      if (result.tier > 1) {
        return;
      }

      renderer.setPixelRatio(1);
    });
  }

  const FOV = 60;
  const calcCamDistance = (h: number) => {
    const vFov = (FOV * Math.PI) / 180;
    const fovRad = vFov * 0.5;
    return (h * 0.5) / Math.tan(fovRad);
  };

  const camera = new PerspectiveCamera(FOV, width / height, 0.1, 3000);
  camera.position.z = calcCamDistance(globalStore.getState().bounds.wh);

  const scene = new Scene();
  const addScene = (child: Object3D) => scene.add(child);
  const removeScene = (child: Object3D) => scene.remove(child);

  useWindowSize(({ width, height, aspect }) => {
    renderer.setSize(width, height);
    camera.aspect = aspect;
    camera.position.z = calcCamDistance(height);

    camera.updateProjectionMatrix();
  });

  useTick(() => {
    renderer.render(scene, camera);
  });

  const { setRenderTarget } = renderer;

  return {
    addScene,
    removeScene,
    setRenderTarget,
  };
}
