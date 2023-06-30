import { defineComponent, useDomRef } from "lake";
import { useGl } from "./use-gl";

export default defineComponent({
  name: "glWorld",
  setup(_) {
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>("canvas");

    return useGl(refs.canvas, dpr);
  },
});
