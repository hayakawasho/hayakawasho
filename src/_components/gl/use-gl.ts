import { Transform } from "ogl";
import { useTick, useWatch } from "@/_foundation";
import { createCamera, createRenderer } from "@/_ogl";
import { viewportRef } from "@/_states/viewport";

export const useGl = (
  canvas: HTMLCanvasElement,
  ww: number,
  wh: number,
  dpr: number
) => {
  const { renderer } = createRenderer(canvas, ww, wh, dpr);
  const { gl } = renderer;

  const { camera, calcDistance } = createCamera(gl, ww, wh);

  const scene = new Transform();

  useTick(() => {
    renderer.render({ camera, scene });
  });

  useWatch(viewportRef, ({ width, height }) => {
    renderer.setSize(width, height);

    const { dist } = calcDistance(height);

    camera.perspective({ aspect: width / height });
    camera.position.z = dist;
  });

  return {
    addScene: (child: Transform) => {
      scene.addChild(child);
    },
    gl,
    removeScene: (child: Transform) => {
      scene.removeChild(child);
    },
  };
};
