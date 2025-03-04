import { useSlot } from "lake";
import { useThree } from "../../../../_libs/lake/useThree";
import RepeatNoise from "./noise";

export const useGlBack = (canvas: HTMLCanvasElement) => {
  const { addChild } = useSlot();

  const glContext = useThree(canvas, 1);

  addChild(canvas, RepeatNoise, {
    dpr: 1,
    ...glContext,
  });

  return glContext;
};
