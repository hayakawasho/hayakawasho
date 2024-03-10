import { defineComponent } from "lake";
import { useThree } from "./use-three";

type Props = {
  resolution: number;
};

export default defineComponent({
  name: "Gl",
  setup(canvas: HTMLCanvasElement, { resolution = 1 }: Props) {
    const { addScene, removeScene } = useThree(canvas, resolution);

    return {
      addScene,
      removeScene,
    };
  },
});
