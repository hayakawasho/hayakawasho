import { useUnmount, ref, readonly } from "lake";
import { atom } from "nanostores";
import { noop } from "@/_foundation/utils";

const posYState = atom(0);

export const useScrollPositionContext = (
  callback: (payload: { currentY: number; oldY: number }) => void = noop
) => {
  const currentY = ref(0);

  const unbind = posYState.listen(y => {
    const oldY = currentY.value;

    callback({
      currentY: y,
      oldY,
    });

    currentY.value = y;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(currentY)] as const;
};

export const scrollPositionMutators = posYState.set;
