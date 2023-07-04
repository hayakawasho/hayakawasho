import {
  defineComponent,
  useDomRef,
  useSlot,
  useIntersectionWatch,
  ref,
  readonly,
} from "lake";
import { Transform , Renderer, Camera } from "ogl";
import { useTick } from "@/_foundation/hooks";
import { useWindowSize } from "@/_states/window-size";
import Sketch from "./sketch01";

export default defineComponent({
  name: "artwork",
  setup(el) {
    const dpr = Math.min(window.devicePixelRatio, 1.5);

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

    const camera = new Camera(gl);
    camera.position.z = 5;

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
      const rect = el.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);

      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      });
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
