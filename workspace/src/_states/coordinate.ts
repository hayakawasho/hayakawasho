import type { States, ZSet } from ".";

export function createMousePositionSlice() {
  const state = {
    x: 0,
    y: 0,
  };

  const selectors = {
    //
  };

  const actions = (set: ZSet<States>) => ({
    updateCoordinate: (x: number, y: number) => {
      set((state) => ({
        ...state,
        x,
        y,
      }));
    },
  });

  return {
    state,
    selectors,
    actions,
  } as const;
}
