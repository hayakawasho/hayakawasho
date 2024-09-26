import { atom, createStore } from "jotai";
import { useUnmount, ref, readonly } from "lake";
import { noop } from "~/_foundation/utils";

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
  const mq = ref(store.get(mqAtom));

  const unsub = store.sub(mqAtom, () => {
    const { anyHover, device } = store.get(mqAtom);
    mq.value = { anyHover, device };

    callback({
      anyHover,
      device,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return readonly(mq).value;
};

export const mediaQueryMutators = (val: MediaQuery) => store.set(mqAtom, val);
