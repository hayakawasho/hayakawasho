import type { States, ZSet } from ".";

export function createWindowScrollSlice() {
  const state = {
    currentY: 0,
  };

  const selectors = {
    scrolling: false,
    oldY: 0,
    diff: 0,
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
        currentY: offsetY,
      }));

      _setWindowScroll(set);
    },
  });

  return {
    state,
    selectors,
    actions,
  } as const;
}
