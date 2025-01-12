import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "../_utils/noop";

export type CursorType = "default" | "hide" | "loading" | "scale" | "drag" | "drag.scale";

const store = createStore();
const cursorTypeAtom = atom<CursorType>("default");

export const useCursorTypeContext = (callback: (payload: CursorType) => void = noop) => {
  const getState = () => store.get(cursorTypeAtom);

  const setState = (newValue: CursorType) => {
    store.set(cursorTypeAtom, newValue);
  };

  const unsub = store.sub(cursorTypeAtom, () => {
    const cursorType = store.get(cursorTypeAtom);

    callback(cursorType);
  });

  useUnmount(() => {
    unsub();
  });

  return [getState, setState] as const;
};
