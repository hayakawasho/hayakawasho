import { useThree } from "./useThree";

export const useFrontCanvas = (canvas: HTMLCanvasElement, dpr: number) => {
  return useThree(canvas, dpr);
};
