import { useUnmount } from "lake";
import { globalStore } from "../../_states";

export const useMousePosition = (
  cb: (payload: { x: number; y: number }) => void,
) => {
  const unsub = globalStore.subscribe(({ coordinate }) => {
    cb({
      x: coordinate.x,
      y: coordinate.y,
    });
  });

  useUnmount(() => {
    unsub();
  });
};
