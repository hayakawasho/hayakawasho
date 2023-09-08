import { defineComponent, useDomRef } from "lake";
import { Transform, Renderer, Camera } from "ogl";
import { useTick } from "@/_foundation/hooks";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";

type Props = {} & Pick<AppContext, "env">;

const MAX_DPR = {
  pc: 1.5,
  sp: 2,
};

export default defineComponent({
  name: "glWorld",
  setup(el, { env }: Props) {
    const dpr = Math.min(window.devicePixelRatio, MAX_DPR[env.mq]);

    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>("canvas");
    const rect = el.getBoundingClientRect();

    const renderer = new Renderer({
      alpha: true,
      canvas: refs.canvas,
      dpr,
      height: rect.height,
      width: rect.width,
    });

    const gl = renderer.gl;

    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const calcDistance = (h: number) => h / 2 / Math.tan(fovRad);

    const camera = new Camera(gl, {
      aspect: rect.width / rect.height,
      far: 1000,
      fov,
      near: 0.1,
    });
    camera.position.z = calcDistance(rect.height);

    const scene = new Transform();

    const [ww, wh] = useWindowSize(({ aspect }) => {
      renderer.setSize(ww.value, wh.value);

      camera.perspective({
        aspect,
      });
      camera.position.z = calcDistance(wh.value);
    });

    useTick(() => {
      renderer.render({
        camera,
        scene,
      });
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
