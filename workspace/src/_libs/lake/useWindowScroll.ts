import { useUnmount } from "lake";
import { globalStore } from "../../_states";

export const useWindowScroll = (cb: (payload: { offsetY: number }) => void) => {
  const unsub = globalStore.subscribe(({ scroll }) => {
    cb({
      offsetY: scroll.offsetY,
    });
  });

  useUnmount(() => {
    unsub();
  });
};
