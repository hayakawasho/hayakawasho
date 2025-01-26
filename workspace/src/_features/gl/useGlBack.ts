import { useSlot } from "lake";
import { useThree } from "../../_libs/lake/useThree";

export const useGlBack = (canvas: HTMLCanvasElement) => {
  const { addChild: _ } = useSlot();

  return useThree(canvas, 1);
};
