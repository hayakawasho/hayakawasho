import { getGPUTier } from 'detect-gpu';
import { useTick } from '@/_foundation/hooks';
import { WebGLRenderer, PerspectiveCamera, Scene } from '@/_foundation/three';
import { useWindowSize } from '@/_states/window-size';
import type { Object3D } from '@/_foundation/three';

export const useThree = (canvas: HTMLCanvasElement, resolution: number) => {
  const { width, height } = canvas.getBoundingClientRect();

  const renderer = new WebGLRenderer({
    alpha: true,
    canvas,
  });

  renderer.setSize(width, height);
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

  const camera = new PerspectiveCamera(FOV, width / height, 0.1, 3000);
  camera.position.z = calcCamDistance(1);

  const scene = new Scene();
  const addScene = (child: Object3D) => scene.add(child);
  const removeScene = (child: Object3D) => scene.remove(child);

  const [, , { isResizing }] = useWindowSize(({ width, height }) => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = calcCamDistance(height);
    camera.updateProjectionMatrix();
  });

  useTick(() => {
    !isResizing.value && renderer.render(scene, camera);
  });

  return {
    addScene,
    removeScene,
  };
};
