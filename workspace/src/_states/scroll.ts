import { atom, createStore } from "jotai";
import { useUnmount, ref, readonly } from "lake";

type ScrollState = {
  scrolling: boolean;
};

const store = createStore();
const scrollAtom = atom<ScrollState>({
  scrolling: false,
});

export const useScrollStateContext = () => {
  const scrolling = ref(false);

  const unsub = store.sub(scrollAtom, () => {
    scrolling.value = store.get(scrollAtom).scrolling;
  });

  useUnmount(() => {
    unsub();
  });

  return {
    scrolling: readonly(scrolling),
  };
};

export const scrollStateYMutators = (val: ScrollState) => store.set(scrollAtom, val);
