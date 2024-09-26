import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "~/_foundation/utils";

export type CursorType = "default" | "hide" | "loading" | "scale" | "drag" | "drag.scale";

const store = createStore();
const cursorTypeAtom = atom<CursorType>("default");

export const useCursorTypeContext = (callback: (payload: CursorType) => void = noop) => {
  const unsub = store.sub(cursorTypeAtom, () => {
    const cursorType = store.get(cursorTypeAtom);

    callback(cursorType);
  });

  useUnmount(() => {
    unsub();
  });
};

export const cursorTypeMutators = (val: CursorType) => store.set(cursorTypeAtom, val);
