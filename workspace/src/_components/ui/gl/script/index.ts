import { defineComponent } from "lake";
import { useThree } from "../../../../_libs/lake/useThree";
import { useWindowSize } from "../../../../_libs/lake/useWindowSize";

export default defineComponent({
  name: "Gl",
  setup(
    canvas: HTMLCanvasElement,
    {
      resolution,
    }: {
      resolution: number;
    },
  ) {
    const { setSize, ...glContext } = useThree(canvas, resolution);

    useWindowSize(({ width, height, aspect }) => {
      setSize(width, height, aspect);
    });

    return glContext;
  },
});
