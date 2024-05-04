import { useUnmount, ref, readonly } from "lake";
import { atom } from "nanostores";

const scrollState = atom({
  // direction: 1,
  scrolling: false,
  // ready: false,
});

export const useScrollStateContext = () => {
  const scrolling = ref(false);

  const unbind = scrollState.listen(payload => {
    scrolling.value = payload.scrolling;
  });

  useUnmount(() => {
    unbind();
  });

  return {
    scrolling: readonly(scrolling),
  };
};

export const scrollStateYMutators = scrollState.set;
