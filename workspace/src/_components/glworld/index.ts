import { getGPUTier } from 'detect-gpu';
import { defineComponent, useDomRef } from 'lake';
import { WebGLRenderer, PerspectiveCamera, Scene } from '@/_foundation/three';
import { useTick } from '@/_foundation/hooks';
import { useWindowSize } from '@/_states/window-size';
import type { Mesh } from '@/_foundation/three';

export default defineComponent({
  name: 'GlWorld',
  setup(el) {
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>('canvas');
    const { height, width } = el.getBoundingClientRect();

    const state = {
      resizing: false,
    };

    const renderer = new WebGLRenderer({
      alpha: true,
      canvas: refs.canvas,
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    getGPUTier().then(result => {
      if (result.tier === 1) {
        renderer.setPixelRatio(1);
      }
    });

    const FOV = 60;
    const calcCamDistance = (h: number) => {
      const vFov = (FOV * Math.PI) / 180;
      const fovRad = vFov * 0.5;
      return (h * 0.5) / Math.tan(fovRad);
    };

    const camera = new PerspectiveCamera(FOV, width / height, 0.1, 2000);
    camera.position.z = calcCamDistance(height);
    camera.position.z = calcCamDistance(height);

    const scene = new Scene();
    const addScene = (child: Mesh) => scene.add(child);
    const removeScene = (child: Mesh) => scene.remove(child);

    useWindowSize(({ aspect, wh, ww }) => {
      state.resizing = true;

      renderer.setSize(ww, wh);
      camera.aspect = aspect;
      camera.position.z = calcCamDistance(wh);
      camera.updateProjectionMatrix();

      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }
      renderer.render(scene, camera);
    });

    return {
      addScene,
      removeScene,
    };
  },
});
