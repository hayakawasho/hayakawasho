import { useUnmount } from "lake";
import { globalStore } from "../../_states";

export const useWindowSize = (
  cb: (payload: {
    aspect: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  }) => void,
) => {
  const unsub = globalStore.subscribe(({ bounds }) => {
    cb({
      aspect: bounds.ww / bounds.wh, // TODO: aspect ratio
      width: bounds.ww,
      height: bounds.wh,
      centerX: bounds.centerX,
      centerY: bounds.centerY,
    });
  });

  useUnmount(() => {
    unsub();
  });
};
