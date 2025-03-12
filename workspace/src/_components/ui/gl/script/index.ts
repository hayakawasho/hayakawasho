import { defineComponent } from "lake";
import { useThree } from "../../../../_libs/lake/useThree";

export default defineComponent({
  name: "Gl",
  setup(
    canvas: HTMLCanvasElement,
    props: {
      resolution: number;
      device: "pc" | "sp";
      anyHover: "hover" | "none";
    },
  ) {
    const { resolution } = props;
    return useThree(canvas, resolution);
  },
});
