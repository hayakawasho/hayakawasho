import { ref, readonly, useUnmount } from 'lake';
import { map } from 'nanostores';
import { noop, waitFrame } from '@/_foundation/utils';
import type { Size } from '@/_foundation/type';

const viewport = map<Size>({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowSize = (
  callback: (payload: { aspect: number; ww: number; wh: number }) => void = noop
) => {
  const { width, height } = viewport.get();

  const windowWidth = ref(width);
  const windowHeight = ref(height);
  const isResizing = ref(false);

  const unbind = viewport.listen(async ({ width, height }) => {
    isResizing.value = true;

    callback({
      aspect: width / height,
      wh: height,
      ww: width,
    });

    windowWidth.value = width;
    windowHeight.value = height;

    await waitFrame();

    isResizing.value = false;
  });

  useUnmount(() => {
    unbind();
  });

  return [
    readonly(windowWidth),
    readonly(windowHeight),
    {
      isResizing: readonly(isResizing),
    },
  ] as const;
};

export const windowSizeMutators = (update: Size) => viewport.set(update);
