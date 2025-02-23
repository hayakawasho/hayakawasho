import { useUnmount } from "lake";
import { globalStore } from "../../_states";

export const useWindowScroll = (cb: (payload: { currentY: number; oldY: number; diff: number }) => void) => {
  const unsub = globalStore.subscribe(({ scroll }) => {
    cb({
      currentY: scroll.currentY,
      oldY: scroll.oldY,
      diff: scroll.diff,
    });
  });

  useUnmount(() => {
    unsub();
  });
};
