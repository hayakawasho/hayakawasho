import type { States, ZSet } from ".";

export function createWindowScrollSlice() {
  const state = {
    offsetY: 0,
  };

  const selectors = {
    scrolling: false,
  };

  const _setWindowScroll = (set: ZSet<States>) => {
    set((state) => {
      selectors.scrolling = true;

      setTimeout(() => {
        selectors.scrolling = false;
      }, 500);

      return state;
    });
  };

  const actions = (set: ZSet<States>) => ({
    onScroll: (offsetY: number) => {
      set((state) => ({
        ...state,
        offsetY,
      }));

      _setWindowScroll(set);
    },
  });

  return {
    state,
    selectors,
    actions,
  };
}
