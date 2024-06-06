import { defineComponent } from "lake";
import { useThree } from "~/_gl/use-three";

export default defineComponent({
  name: "FrontCanvas",
  setup(canvas: HTMLCanvasElement, { dpr }: { dpr: number }) {
    const glContext = useThree(canvas, dpr);

    return {
      ...glContext,
    };
  },
});
