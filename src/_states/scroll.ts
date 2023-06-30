import { useUnmount } from "lake";
import { map } from "nanostores";

const pos = map<{
  y: number;
}>({
  y: 0,
});

export const useScrollTween = (callback: (payload: { y: number }) => void) => {
  const unbind = pos.listen(({ y }) => {
    callback({
      y,
    });
  });

  useUnmount(() => {
    unbind();
  });
};

export const scrollPosMutators = (update: { y: number }) =>
  pos.set({ y: update.y });
