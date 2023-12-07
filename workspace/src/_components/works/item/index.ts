import { defineComponent, useMount, useDomRef, ref } from 'lake';
import { useTick } from '@/_foundation/hooks';
import { splitTextNode2Words } from '@/_foundation/split-text';
import { Tween } from '@/_foundation/tween';
import { nextTick } from '@/_foundation/utils';
import { useWindowSize } from '@/_states/window-size';
import { useThumbnail } from './use-thumbnail';
import type { useInfiniteScroll } from '@/_foundation/hooks';
import type { AppContext } from '@/_foundation/type';

type Props = AppContext & {
  infiniteScrollContext: ReturnType<typeof useInfiniteScroll>;
};

type Refs = {
  text: HTMLElement;
  img: HTMLImageElement;
};

export default defineComponent({
  name: 'Item',
  setup(el: HTMLElement, context: Props) {
    const { once, infiniteScrollContext, mq, history } = context;
    const { posY, diff } = infiniteScrollContext;

    const { refs } = useDomRef<Refs>('text', 'img');

    if (mq.value === 'pc') {
      useThumbnail(el, context.glContext);
    }

    const isResizing = ref(false);

    const SPEED = {
      pc: 0.9,
      sp: 1,
    };

    useTick(() => {
      if (isResizing.value) {
        return;
      }

      const scale = 1 - diff.value * 0.0005 * SPEED[mq.value];
      const y = infiniteScrollContext.wrap(posY.value);

      el.style.transform = `translateY(${-y}px) translateZ(0) scale(${scale})`;
    });

    const { split, onSplitUpdate } = splitTextNode2Words(refs.text);

    useWindowSize(() => {
      isResizing.value = true;

      onSplitUpdate();
      infiniteScrollContext.resize();

      isResizing.value = false;
    });

    useMount(() => {
      if (!once && history.value === 'push') {
        Tween.serial(
          Tween.prop([refs.img, split.words], {
            willChange: 'transform',
            y: '1.2em',
          }),
          Tween.wait(0.1),
          Tween.parallel(
            Tween.tween([refs.img, split.words], 1.25, 'custom.out', {
              stagger: 0.03,
              y: '0em',
            })
          ),
          Tween.immediate(() => {
            Tween.prop([refs.img, split.words], {
              clearProps: 'will-change',
            });
          })
        );
      }

      return async () => {
        Tween.kill([refs.img, split.words]);

        if (history.value === 'pop') {
          return;
        }

        Tween.prop([refs.img, split.words], {
          willChange: 'transform',
        });

        await nextTick();

        Tween.tween([refs.img, split.words], 0.45, 'custom.in', {
          y: '-1.2em',
        });
      };
    });
  },
});
