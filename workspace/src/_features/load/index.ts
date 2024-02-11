import htmx from 'htmx.org';
import { defineComponent, useDomRef, useSlot, useMount, ref, readonly } from 'lake';
import { wideQuery } from '~/_foundation/env';
import { useElementSize } from '~/_foundation/hooks';
import { mediaQueryMutators } from '~/_states/mq';
import { routeMutators } from '~/_states/route';
import { windowSizeMutators } from '~/_states/window-size';
import Gl from '../gl';
import ScrollTweenContainer from '../scroll-tween-container';
import type { AppContext, RouteName } from '~/_foundation/type';

type Props = {
  onCreated: (props?: Omit<AppContext, 'once'>) => void;
  onUpdated: (scope: HTMLElement, props?: Omit<AppContext, 'once'>) => void;
  onCleanup: (scope: HTMLElement) => void;
};

type Refs = {
  backCanvas: HTMLCanvasElement;
  frontCanvas: HTMLCanvasElement;
  main: HTMLElement;
  windowSizeWatcher: HTMLElement;
};

export default defineComponent({
  name: 'Load',
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>('backCanvas', 'frontCanvas', 'main', 'windowSizeWatcher');

    mediaQueryMutators(wideQuery.matches ? 'pc' : 'sp');

    const [scrollContext] = addChild(refs.main, ScrollTweenContainer);
    const [backCanvasContext] = addChild(refs.backCanvas, Gl);
    const [frontCanvasContext] = addChild(refs.frontCanvas, Gl, {
      resolution: Math.min(window.devicePixelRatio, 1.5),
    });

    const history = ref<'push' | 'pop'>('push');

    const provides = {
      backCanvasContext: backCanvasContext.current,
      frontCanvasContext: frontCanvasContext.current,
      history: readonly(history),
      scrollContext: scrollContext.current,
    } as AppContext;

    useMount(() => {
      onCreated(provides);
    });

    useElementSize(refs.windowSizeWatcher, ({ width, height }) => {
      windowSizeMutators({
        height,
        width,
      });
    });

    //----------------------------------------------------------------

    const onLeave = (from: HTMLElement) => {
      scrollContext.current.pause();
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr as RouteName;
      document.body.dataset.page = namespace;

      scrollContext.current.reInit(to);
      scrollContext.current.set(0);
      scrollContext.current.resume();

      onUpdated(to, provides);

      routeMutators({
        name: namespace,
      });
    };

    const xhr = '[data-xhr]';
    const fromContainer = ref(htmx.find(refs.main, xhr) as HTMLElement);

    htmx.config.historyCacheSize = 1;

    htmx.on('htmx:historyRestore', e => {
      history.value = 'pop';
      onLeave(fromContainer.value);

      const { detail } = e as CustomEvent;
      const newContainer = htmx.find(detail.elt, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on('htmx:beforeHistorySave', e => {
      const { detail } = e as CustomEvent;
      const oldContainer = htmx.find(detail.historyElt, xhr) as HTMLElement;
      onLeave(oldContainer);
      fromContainer.value = oldContainer;
    });

    htmx.on('htmx:beforeSwap', () => {
      history.value = 'push';
    });

    htmx.on('htmx:afterSwap', e => {
      const { detail } = e as CustomEvent;
      const newContainer = htmx.find(detail.target, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on('htmx:xhr:progress', e => {
      // const { detail } = e as CustomEvent;
      // const loadProgress = Math.floor((detail.loaded / detail.total) * 1000) / 1000;
    });
  },
});
