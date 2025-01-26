import { useThree } from "../../_libs/lake/useThree";

export const useGlFront = (canvas: HTMLCanvasElement, dpr: number) => {
  return useThree(canvas, dpr);
};
