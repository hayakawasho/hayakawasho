import { useEvent } from 'lake';
import { Tween } from '@/_foundation/tween';
import { waitFrame } from '@/_foundation/utils';

type Context = {
  chars: HTMLElement[];
  stagger?: number;
  mq: 'pc' | 'sp';
};

export const useMouseoverSplitText = (
  target: HTMLElement,
  { chars, stagger = 0.02, mq }: Context
) => {
  useEvent(target, 'mouseenter', async () => {
    if (mq === 'sp') {
      return;
    }

    Tween.kill(chars);
    Tween.prop(chars, {
      willChange: 'transform',
      y: '0%',
    });

    await waitFrame();

    Tween.tween(chars, 1.6, 'expo.out', {
      onComplete: () => {
        Tween.prop(chars, {
          clearProps: 'will-change',
        });
      },
      stagger,
      y: `-100%`,
    });
  });
};
