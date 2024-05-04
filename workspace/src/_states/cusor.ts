import { useUnmount } from "lake";
import { atom } from "nanostores";
import { noop } from "@/_foundation/utils";

export type CursorType = "default" | "hide" | "loading" | "scale" | "drag" | "drag.scale";

const cursorTypeState = atom<CursorType>("default");

export const useCursorTypeContext = (callback: (payload: CursorType) => void = noop) => {
  const unbind = cursorTypeState.listen(val => {
    callback(val);
  });

  useUnmount(() => {
    unbind();
  });
};

export const cursorTypeMutators = cursorTypeState.set;
