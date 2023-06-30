import { Transform } from "ogl";
import { useTick } from "@/_foundation";
import { createCamera, createRenderer } from "@/_gl";
import { useWindowSize } from "@/_states/window-size";

export const useGl = (canvas: HTMLCanvasElement, dpr: number) => {
  const [ww, wh] = useWindowSize(({ aspect }) => {
    onResize(aspect);
  });

  const { renderer } = createRenderer(canvas, ww.value, wh.value, dpr);

  const { camera, calcDistance } = createCamera(
    renderer.gl,
    ww.value,
    wh.value
  );

  const scene = new Transform();

  const onResize = (aspect: number) => {
    renderer.setSize(ww.value, wh.value);

    const { dist } = calcDistance(wh.value);

    camera.perspective({ aspect });
    camera.position.z = dist;
  };

  useTick(() => {
    renderer.render({ camera, scene });
  });

  const addScene = (child: Transform) => {
    scene.addChild(child);
  };

  const removeScene = (child: Transform) => {
    scene.removeChild(child);
  };

  return {
    addScene,
    gl: renderer.gl,
    removeScene,
  };
};
