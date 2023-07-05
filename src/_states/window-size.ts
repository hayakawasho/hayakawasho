import { ref, readonly, useUnmount } from "lake";
import { map } from "nanostores";
import type { Size } from "@/_foundation/type";

const viewport = map<Size>({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowSize = (
  callback: (payload: { aspect: number }) => void
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
    });

    state.ww.value = width;
    state.wh.value = height;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(state.ww), readonly(state.wh)] as const;
};

export const windowSizeMutators = (update: Size) => viewport.set(update);
