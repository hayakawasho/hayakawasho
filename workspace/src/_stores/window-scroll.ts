import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "../_utils/noop";
import globalStore from ".";

const store = createStore();
const scrollYAtom = atom(globalStore.offsetY);

export const useWindowScroll = (
  callback: (payload: { currentY: number; oldY: number; diff: number }) => void = noop,
) => {
  const getState = () => store.get(scrollYAtom);

  const setState = (newValue: number) => {
    globalStore.offsetY = newValue;
    store.set(scrollYAtom, newValue);
  };

  let oldY = globalStore.offsetY;

  const unsub = store.sub(scrollYAtom, () => {
    const currentY = store.get(scrollYAtom);
    const diff = currentY - oldY;

    callback({
      currentY,
      oldY,
      diff,
    });

    oldY = currentY;
  });

  useUnmount(() => {
    unsub();
  });

  return [getState, setState] as const;
};
