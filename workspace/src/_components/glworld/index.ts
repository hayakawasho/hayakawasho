import { getGPUTier } from 'detect-gpu';
import { defineComponent, useDomRef, ref } from 'lake';
import { useTick } from '@/_foundation/hooks';
import { WebGLRenderer, PerspectiveCamera, Scene } from '@/_foundation/three';
import { useWindowSize } from '@/_states/window-size';
import type { Object3D } from '@/_foundation/three';

type Refs = {
  canvas: HTMLCanvasElement;
};

export default defineComponent({
  name: 'GlWorld',
  setup(el) {
    const { refs } = useDomRef<Refs>('canvas');

    const isResizing = ref(false);

    const renderer = new WebGLRenderer({
      alpha: true,
      canvas: refs.canvas,
    });

    const { height, width } = el.getBoundingClientRect();

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
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
    const addScene = (child: Object3D) => scene.add(child);
    const removeScene = (child: Object3D) => scene.remove(child);

    useWindowSize(({ aspect, wh, ww }) => {
      isResizing.value = true;

      renderer.setSize(ww, wh);
      camera.aspect = aspect;
      camera.position.z = calcCamDistance(wh);
      camera.updateProjectionMatrix();

      isResizing.value = false;
    });

    useTick(() => {
      if (isResizing.value) {
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
