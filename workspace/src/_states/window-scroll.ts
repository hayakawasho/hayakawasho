import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "~/_foundation/utils";
import globalStore from ".";

const store = createStore();
const scrollYAtom = atom(globalStore.offsetY);

export const useWindowScroll = (
  callback: (payload: { currentY: number; oldY: number; diff: number }) => void = noop,
) => {
  const getState = () => store.get(scrollYAtom);

  const setState = (currentY: number) => {
    globalStore.offsetY = currentY;
    store.set(scrollYAtom, currentY);
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
