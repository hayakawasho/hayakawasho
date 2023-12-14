import { defineComponent, useSlot, useDomRef, useMount } from 'lake';
import { useInfiniteScroll } from '@/_foundation/hooks';
// import { Tween } from '@/_foundation/tween';
// import { waitFrame } from '@/_foundation/utils';
import GridItem from './grid-item';
import type { AppContext } from '@/_foundation/type';

type Refs = {
  grid: HTMLElement;
  gridItem: HTMLElement[];
};

export default defineComponent({
  name: 'Archives',
  setup(_el, context: AppContext) {
    const { history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>('grid', 'gridItem');

    const infiniteScrollContext = useInfiniteScroll(refs.grid, context.mq.value);

    addChild(refs.gridItem, GridItem, {
      ...context,
      infiniteScrollContext,
    });

    useMount(() => {
      if (history.value === 'push') {
        //
      }

      return async () => {
        if (history.value === 'pop') {
          return;
        }
      };
    });
  },
});
