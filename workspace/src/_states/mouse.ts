import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "~/_foundation/utils";
import globalStore from ".";
import type { Point } from "~/_foundation/types";

const store = createStore();
const mousePosAtom = atom<Point>(globalStore.coordinate);

export const useMousePosition = (callback: (payload: Point) => void = noop) => {
  const getState = () => store.get(mousePosAtom);

  const setState = (coordinate: Point) => {
    globalStore.coordinate = coordinate;
    store.set(mousePosAtom, coordinate);
  };

  const unsub = store.sub(mousePosAtom, () => {
    const coordinate = store.get(mousePosAtom);
    callback(coordinate);
  });

  useUnmount(() => {
    unsub();
  });

  return [getState, setState] as const;
};
