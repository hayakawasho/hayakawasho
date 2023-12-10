import { WebGLRenderer, PerspectiveCamera, Scene } from '@/_foundation/three';
import type { Object3D } from '@/_foundation/three';

export const useGl = (canvas: HTMLCanvasElement, dpr: number) => {
  const renderer = new WebGLRenderer({
    alpha: true,
    canvas,
  });

  renderer.setSize(1, 1);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(dpr);

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

  return {
    addScene,
    removeScene,
    render: () => {
      renderer.render(scene, camera);
    },
    resize: (width: number, height: number, aspect: number) => {
      renderer.setSize(width, height);
      camera.aspect = aspect;
      camera.position.z = calcCamDistance(height);
      camera.updateProjectionMatrix();
    },
    setPixelRatio(val: number) {
      renderer.setPixelRatio(val);
    },
  };
};
