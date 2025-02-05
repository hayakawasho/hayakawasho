import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import globalStore from ".";
import { noop } from "../_utils/noop";

const store = createStore();

const viewportAtom = atom<Size>({
  height: globalStore.bounds.wh,
  width: globalStore.bounds.ww,
});

export const useWindowSize = (callback: (payload: { aspect: number; windowSize: Size }) => void = noop) => {
  const getState = () => store.get(viewportAtom);

  const setState = (newValue: Size) => {
    globalStore.bounds.ww = newValue.width;
    globalStore.bounds.wh = newValue.height;
    globalStore.bounds.centerX = newValue.width * 0.5;
    globalStore.bounds.centerY = newValue.height * 0.5;

    store.set(viewportAtom, newValue);
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
