import { getGPUTier } from 'detect-gpu';
import { useTick } from '@/_foundation/hooks';
import { WebGLRenderer, PerspectiveCamera, Scene } from '@/_foundation/three';
import { useWindowSize } from '@/_states/window-size';
import type { Object3D } from '@/_foundation/three';

type Context = {
  resolution: number;
};

export const useThree = (canvas: HTMLCanvasElement, { resolution = 1 }: Context) => {
  const renderer = new WebGLRenderer({
    alpha: true,
    canvas,
  });

  renderer.setSize(1, 1);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(resolution);

  getGPUTier().then(result => {
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

  const camera = new PerspectiveCamera(FOV, 1 / 1, 0.1, 2000);
  camera.position.z = calcCamDistance(1);

  const scene = new Scene();
  const addScene = (child: Object3D) => scene.add(child);
  const removeScene = (child: Object3D) => scene.remove(child);

  useWindowSize(({ aspect, wh, ww }) => {
    renderer.setSize(ww, wh);
    camera.aspect = aspect;
    camera.position.z = calcCamDistance(wh);
    camera.updateProjectionMatrix();
  });

  useTick(() => {
    renderer.render(scene, camera);
  });

  return {
    addScene,
    removeScene,
  };
};
