import { getGPUTier } from "detect-gpu";
import { useTick } from "../../_libs/lake/useTick";
import { WebGLRenderer, PerspectiveCamera, Scene } from "../../_libs/three";
import globalStore from "../../_stores";
import { useWindowSize } from "../../_stores/window-size";
import type { Object3D } from "../../_libs/three";

export const useThree = (canvas: HTMLCanvasElement, resolution: number) => {
  const { width, height } = canvas.getBoundingClientRect();

  const renderer = new WebGLRenderer({
    alpha: true,
    canvas,
  });

  renderer.setSize(width, height);
  renderer.setClearColor(13092551, 0);
  renderer.setPixelRatio(resolution);

  getGPUTier().then((result) => {
    if (result.tier === 1 && resolution > 1) {
      renderer.setPixelRatio(1);
    }
  });

  const FOV = 60;
  const calcCamDistance = (h: number) => {
    const vFov = (FOV * Math.PI) / 180;
    const fovRad = vFov * 0.5;
    return (h * 0.5) / Math.tan(fovRad);
  };

  const camera = new PerspectiveCamera(FOV, width / height, 0.1, 3000);
  camera.position.z = calcCamDistance(globalStore.bounds.wh);

  const scene = new Scene();
  const addScene = (child: Object3D) => scene.add(child);
  const removeScene = (child: Object3D) => scene.remove(child);

  useWindowSize(({ windowSize, aspect }) => {
    renderer.setSize(windowSize.width, windowSize.height);
    camera.aspect = aspect;
    camera.position.z = calcCamDistance(windowSize.height);

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
};
