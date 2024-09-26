import { defineComponent, useSlot } from "lake";
import RepeatNoise from "./repeat-noise";
import { useThree } from "./use-three";

export default defineComponent({
  name: "BackCanvas",
  setup(canvas: HTMLCanvasElement, { dpr }: { dpr: number }) {
    const glContext = useThree(canvas, 1);
    const { addChild } = useSlot();

    addChild(canvas, RepeatNoise, {
      ...glContext,
      dpr,
    });

    return {
      ...glContext,
    };
  },
});
