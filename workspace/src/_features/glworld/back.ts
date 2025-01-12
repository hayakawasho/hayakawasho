import { useSlot } from "lake";
import { useThree } from "./use-three";

export const useBackCanvas = (canvas: HTMLCanvasElement) => {
  const { addChild: _ } = useSlot();

  return useThree(canvas, 1);
};
