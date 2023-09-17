import { defineComponent, useDomRef } from "lake";
import { Transform, Renderer, Camera } from "ogl";
import { useTick } from "@/_foundation/hooks";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";

const dpr = {
  pc: 1.5,
  sp: 2,
};

const fov = 60;
const fovRad = (fov / 2) * (Math.PI / 180);
const calcDistance = (h: number) => h / 2 / Math.tan(fovRad);

export default defineComponent({
  name: "glWorld",
  setup(el, { env }: Pick<AppContext, "env">) {
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>("canvas");
    const { height, width } = el.getBoundingClientRect();

    const state = {
      resizing: false,
    };

    const renderer = new Renderer({
      alpha: true,
      canvas: refs.canvas,
      dpr: Math.min(window.devicePixelRatio, dpr[env.mq]),
      height,
      width,
    });

    const gl = renderer.gl;

    const camera = new Camera(gl, {
      aspect: width / height,
      far: 1000,
      fov,
      near: 0.1,
    });

    camera.position.z = calcDistance(height);

    const scene = new Transform();

    useWindowSize(({ aspect, wh, ww }) => {
      state.resizing = true;
      renderer.setSize(ww, wh);
      camera.perspective({ aspect });
      camera.position.z = calcDistance(wh);
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }

      renderer.render({
        camera,
        scene,
      });
    });

    return {
      addScene: (child: Transform) => {
        scene.addChild(child);
      },
      gl: renderer.gl,
      removeScene: (child: Transform) => {
        scene.removeChild(child);
      },
    };
  },
});
