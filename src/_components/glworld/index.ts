import { defineComponent, useDomRef } from "lake";
import { Transform, Renderer } from "ogl";
import { useTick } from "@/_foundation/hooks";
import { createCamera } from "@/_gl";
import { useWindowSize } from "@/_states/window-size";

export default defineComponent({
  name: "glWorld",
  setup(el) {
    const dpr = Math.min(window.devicePixelRatio, 1.5);

    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>("canvas");
    const rect = el.getBoundingClientRect();

    const renderer = new Renderer({
      alpha: true,
      canvas: refs.canvas,
      dpr,
      height: rect.height,
      width: rect.width,
    });

    const { camera, calcDistance } = createCamera(
      renderer.gl,
      rect.width,
      rect.height
    );

    const scene = new Transform();

    const [ww, wh] = useWindowSize(({ aspect }) => {
      renderer.setSize(ww.value, wh.value);

      const { dist } = calcDistance(wh.value);

      camera.perspective({ aspect });
      camera.position.z = dist;
    });

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
  },
});
