import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "~/_foundation/utils";
import globalStore from ".";
import type { Size } from "~/_foundation/types";

const store = createStore();

const viewportAtom = atom<Size>({
  height: globalStore.bounds.wh,
  width: globalStore.bounds.ww,
});

export const useWindowSize = (callback: (payload: { aspect: number; windowSize: Size }) => void = noop) => {
  const getState = () => store.get(viewportAtom);

  const setState = (windowSize: Size) => {
    globalStore.bounds.ww = windowSize.width;
    globalStore.bounds.wh = windowSize.height;
    globalStore.bounds.centerX = windowSize.width * 0.5;
    globalStore.bounds.centerY = windowSize.height * 0.5;

    store.set(viewportAtom, windowSize);
  };

  const unsub = store.sub(viewportAtom, () => {
    const windowSize = store.get(viewportAtom);
    const aspect = windowSize.width / windowSize.height;

    callback({
      aspect,
      windowSize,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return [getState, setState] as const;
};
