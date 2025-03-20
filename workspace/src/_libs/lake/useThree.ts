import { getGPUTier } from "detect-gpu";
import { PerspectiveCamera, Scene, WebGLRenderer } from "../three";
import type { Object3D } from "../three";
import { useTick } from "./useTick";

export function useThree(canvas: HTMLCanvasElement, resolution: number) {
  const { width, height } = canvas.getBoundingClientRect();
  const canvasAspect = width / height;

  const renderer = new WebGLRenderer({
    alpha: true,
    canvas,
  });

  renderer.setSize(width, height);
  renderer.setClearColor(13092551, 0);
  renderer.setPixelRatio(resolution);

  if (resolution > 1) {
    getGPUTier().then((result) => {
      console.log("getGPUTier:", { ...result });

      if (result.tier > 1) {
        return;
      }

      renderer.setPixelRatio(1);
    });
  }

  const FOV = 60;
  function calcCamDistance(h: number) {
    const vFov = (FOV * Math.PI) / 180;
    const fovRad = vFov * 0.5;
    return (h * 0.5) / Math.tan(fovRad);
  }

  const camera = new PerspectiveCamera(FOV, canvasAspect, 0.1, 3000);

  const scene = new Scene();
  const addScene = (child: Object3D) => scene.add(child);
  const removeScene = (child: Object3D) => scene.remove(child);

  function setSize(width: number, height: number, aspect: number) {
    renderer.setSize(width, height);
    camera.aspect = aspect;
    camera.position.z = calcCamDistance(height);

    camera.updateProjectionMatrix();
  }

  useTick(() => {
    renderer.render(scene, camera);
  });

  const { setRenderTarget } = renderer;

  return {
    addScene,
    removeScene,
    setRenderTarget,
    setSize,
  };
}
