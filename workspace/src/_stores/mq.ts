import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "../_utils/noop";

type MediaQuery = {
  device: "pc" | "sp";
  anyHover: boolean;
};

const store = createStore();
const mqAtom = atom<MediaQuery>({
  anyHover: true,
  device: "pc",
});

export const useMediaQuery = (callback: (payload: MediaQuery) => void = noop) => {
  const getState = () => store.get(mqAtom);

  const setState = (newValues: MediaQuery) => {
    store.set(mqAtom, newValues);
  };

  const unsub = store.sub(mqAtom, () => {
    const { anyHover, device } = store.get(mqAtom);

    callback({
      anyHover,
      device,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return [getState, setState] as const;
};
