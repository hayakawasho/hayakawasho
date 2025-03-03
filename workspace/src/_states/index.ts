import { createStore } from "zustand/vanilla";
import { createWindowSizeSlice } from "./bounds";
import { createMousePositionSlice } from "./coordinate";
import { createWindowScrollSlice } from "./scroll";

export type ZSet<T> = {
  (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: false | undefined,
  ): void;
  (state: T | ((state: T) => T), replace: true): void;
};

export type States = {
  bounds: {
    ww: number;
    wh: number;
    centerX: number;
    centerY: number;
    aspect: number;
    resizeWindow: (width: number, height: number) => void;
  };
  coordinate: {
    x: number;
    y: number;
    updateCoordinate: (x: number, y: number) => void;
  };
  scroll: {
    currentY: number;
    oldY: number;
    diff: number;
    updateScrollY: (offsetY: number) => void;
  };
};

export const globalStore = createStore<States>()((set) => {
  const windowSizeStore = createWindowSizeSlice();
  const mousePositionStore = createMousePositionSlice();
  const windowScrollStore = createWindowScrollSlice();

  return {
    bounds: {
      ...windowSizeStore.state,
      ...windowSizeStore.actions(set),
      ...windowSizeStore.selectors,
    },
    coordinate: {
      ...mousePositionStore.state,
      ...mousePositionStore.actions(set),
    },
    scroll: {
      ...windowScrollStore.state,
      ...windowScrollStore.actions(set),
      ...windowScrollStore.selectors,
    },
  } as const;
});
