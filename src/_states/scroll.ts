import { useUnmount, ref, readonly } from "lake";
import { map } from "nanostores";

const pos = map<{
  y: number;
}>({
  y: 0,
});

export const useScrollTween = (callback: (payload: { y: number }) => void) => {
  const { y } = pos.get();
  const currentY = ref(y);

  const unbind = pos.listen(({ y }) => {
    callback({
      y,
    });
    currentY.value = y;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(currentY)] as const;
};

export const scrollPosMutators = (update: { y: number }) =>
  pos.set({ y: update.y });
