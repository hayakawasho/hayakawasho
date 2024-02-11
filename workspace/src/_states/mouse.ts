import { useUnmount, ref, readonly } from 'lake';
import { map } from 'nanostores';
import type { Point } from '~/_foundation/type';

const pos = map<Point>({
  x: 0,
  y: 0,
});

export const useMousePos = () => {
  const { x, y } = pos.get();
  const posX = ref(x);
  const posY = ref(y);

  const unbind = pos.listen(({ x, y }) => {
    posX.value = x;
    posY.value = y;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(posX), readonly(posY)] as const;
};

export const mousePosMutators = (update: Point) => pos.set(update);
