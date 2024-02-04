import { useUnmount, ref, readonly } from 'lake';
import { atom } from 'nanostores';
import { noop } from '~/_foundation/utils';

const posY = atom(0);
const isScrolling = atom(false);

export const useScrollPosY = (
  callback: (payload: { currentY: number; oldY: number }) => void = noop
) => {
  const refPosY = ref(posY.get());
  const refIsScrolling = ref(isScrolling.get());

  const unbindScrolling = isScrolling.listen(running => {
    refIsScrolling.value = running;
  });

  const unbindPosY = posY.listen(y => {
    const oldY = refPosY.value;

    callback({
      currentY: y,
      oldY,
    });

    refPosY.value = y;
  });

  useUnmount(() => {
    unbindScrolling();
    unbindPosY();
  });

  return [
    readonly(refPosY),
    {
      isScrolling: readonly(refIsScrolling),
    },
  ] as const;
};

export const scrollPosYMutators = (value: number) => posY.set(value);

export const isScrollingMutators = (value: boolean) => isScrolling.set(value);
