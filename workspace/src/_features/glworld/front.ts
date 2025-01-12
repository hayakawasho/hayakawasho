import { useThree } from "./use-three";

export const useFrontCanvas = (canvas: HTMLCanvasElement, dpr: number) => {
  return useThree(canvas, dpr);
};
