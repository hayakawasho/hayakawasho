import {
  defineComponent,
  useDomRef,
  useSlot,
  useIntersectionWatch,
  ref,
  readonly,
} from "lake";
import { Transform, Renderer, Camera } from "ogl";
import { useTick } from "@/_foundation/hooks";
import { useWindowSize } from "@/_states/window-size";
import Sketch from "./sketch00";
// import Sketch from "./sketch01";
// import Sketch from "./sketch02";

export default defineComponent({
  name: "artwork",
  setup(el) {
    // const dpr = Math.min(window.devicePixelRatio, 1.5);
    const dpr = 0.5;

    const isVisible = ref(false);

    const { addChild } = useSlot();
    const { refs } = useDomRef<{ artworkCanvas: HTMLCanvasElement }>(
      "artworkCanvas"
    );

    const rect = el.getBoundingClientRect();

    const renderer = new Renderer({
      alpha: true,
      canvas: refs.artworkCanvas,
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

    useIntersectionWatch(
      el,
      ([entry]) => {
        isVisible.value = entry.isIntersecting;
      },
      {
        rootMargin: "25%",
      }
    );

    useWindowSize(() => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height);

      camera.perspective({
        aspect: width / height,
      });
      camera.position.z = calcDistance(height);
    });

    useTick(() => {
      if (!isVisible.value) {
        return;
      }

      renderer.render({
        camera,
        scene,
      });
    });

    addChild(el, Sketch, {
      gl,
      isVisible: readonly(isVisible),
      scene,
    });
  },
});
