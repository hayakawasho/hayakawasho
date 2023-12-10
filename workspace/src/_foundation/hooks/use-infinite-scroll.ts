import { useMount, useEvent } from 'lake';
import { useWindowSize } from '@/_states/window-size';
import { useScrollTween } from './use-scroll-tween';

export const useInfiniteScroll = (container: HTMLElement, mq: 'pc' | 'sp') => {
  const EASE = {
    pc: 0.08,
    sp: 0.09,
  } as const;

  const scrollTweenContext = useScrollTween(EASE[mq]);

  useWindowSize(() => {
    const maxY = container.getBoundingClientRect().height / 2;
    scrollTweenContext.resize(maxY);
  });

  useEvent(window as any, 'wheel', scrollTweenContext.onWheel, {
    passive: true,
  });

  useEvent(window as any, 'touchmove', scrollTweenContext.onTouchmove, {
    passive: true,
  });

  useMount(() => {
    const maxY = container.getBoundingClientRect().height / 2;
    scrollTweenContext.resize(maxY);
  });

  return {
    diff: scrollTweenContext.diff,
    posY: scrollTweenContext.posY,
    wrap: scrollTweenContext.wrap,
  };
};
