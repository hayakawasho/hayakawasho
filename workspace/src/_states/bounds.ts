import type { States, ZSet } from ".";

export function createWindowSizeSlice() {
  const state = {
    ww: 0,
    wh: 0,
  };

  const selectors = {
    centerX: 0,
    centerY: 0,
    aspect: 0,
  };

  const _setWindowSize = (set: ZSet<States>) => {
    set((state) => {
      selectors.centerX = state.bounds.ww / 2;
      selectors.centerY = state.bounds.wh / 2;
      selectors.aspect = state.bounds.ww / state.bounds.wh;

      return state;
    });
  };

  const actions = (set: ZSet<States>) => ({
    resizeWindow: (width: number, height: number) => {
      set((state) => ({
        ...state,
        ww: width,
        wh: height,
      }));

      _setWindowSize(set);
    },
  });

  return {
    state,
    selectors,
    actions,
  } as const;
}
