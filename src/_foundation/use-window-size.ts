import { ref, readonly, useUnmount } from "lake";
import { map } from "nanostores";
import type { Size } from "@/_foundation";

const { innerWidth, innerHeight } = window;

const viewport = map<Size>({
  height: innerHeight,
  width: innerWidth,
});

export const useWindowSize = (
  callback: (payload: { ww: number; wh: number; aspect: number }) => void
) => {
  const { width, height } = viewport.get();

  const state = {
    wh: ref(height),
    ww: ref(width),
  };

  const unbind = viewport.listen(({ width, height }) => {
    const aspect = width / height;

    callback({
      aspect,
      wh: height,
      ww: width,
    });

    state.ww.value = width;
    state.wh.value = height;
  });

  useUnmount(() => {
    unbind();
  });

  return {
    wh: readonly(state.wh),
    ww: readonly(state.ww),
  };
};
