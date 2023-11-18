import { useUnmount, ref, readonly } from "lake";
import { atom } from "nanostores";
import { noop } from "@/_foundation/utils";

const posY = atom(0);
const isRunning = atom(false);

export const useScrollPosY = (
  callback: (payload: { currentY: number; oldY: number }) => void = noop
) => {
  const currentY = ref(0);
  const isScrolling = ref(false);

  const unbindScrolling = isRunning.listen((running) => {
    isScrolling.value = running;
  });

  const unbindPosY = posY.listen((y) => {
    const oldY = currentY.value;

    callback({
      currentY: y,
      oldY,
    });

    currentY.value = y;
  });

  useUnmount(() => {
    unbindScrolling();
    unbindPosY();
  });

  return [
    readonly(currentY),
    {
      isScrolling: readonly(isScrolling),
    },
  ] as const;
};

export const scrollPosMutators = (value: number) => {
  posY.set(value);
};

export const isScrollingMutators = (value: boolean) => {
  isRunning.set(value);
};
