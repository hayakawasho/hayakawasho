import { atom } from "jotai";
import { map } from "nanostores";
import { useUnmount, ref, readonly } from "lake";
import type { Point } from "~/_foundation/type";
import { store } from "./";

const pos = map<Point>({
  x: 0,
  y: 0,
});

const $pos = atom({
  x: 0,
  y: 0,
});

export const useMousePosState = () => {
  return store.get($pos);
};

export const useMousePosMutators = (newValue: { x: number; y: number }) => {
  return store.set(newValue);
};

export const useMousePositionContext = () => {
  const { x, y } = pos.get();
  const posX = ref(x);
  const posY = ref(y);

  const unbind = pos.listen(({ x, y }) => {
    posX.value = x;
    posY.value = y;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(posX), readonly(posY)] as const;
};

export const mousePosMutators = pos.set;
