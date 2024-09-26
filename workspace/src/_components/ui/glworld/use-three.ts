import { getGPUTier } from "detect-gpu";
import { useTick } from "~/_foundation/hooks";
import { WebGLRenderer, PerspectiveCamera, Scene } from "~/_foundation/libs/three";
import { useWindowSize } from "~/_states/window-size";
import store from "~/_states";
import type { Object3D } from "~/_foundation/libs/three";

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
  camera.position.z = calcCamDistance(store.bounds.wh);

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

  return {
    addScene,
    removeScene,
    renderer,
  };
};
