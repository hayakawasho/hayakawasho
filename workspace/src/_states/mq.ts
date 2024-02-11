import { useUnmount, ref, readonly } from 'lake';
import { atom } from 'nanostores';
import { noop } from '~/_foundation/utils';

type MediaQuery = 'pc' | 'sp';

const mediaQuery = atom<MediaQuery>('pc');

export const useMediaQuery = (callback: (payload: MediaQuery) => void = noop) => {
  const mq = ref<MediaQuery>(mediaQuery.get());

  const unbind = mediaQuery.listen(val => {
    mq.value = val;
    callback(val);
  });

  useUnmount(() => {
    unbind();
  });

  return readonly(mq);
};

export const mediaQueryMutators = (update: MediaQuery) => mediaQuery.set(update);
