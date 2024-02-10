import { defineComponent, useSlot, useDomRef, useMount } from 'lake';
// import { useInfiniteScroll } from '~/_foundation/hooks';
// import { Tween } from '~/_foundation/tween';
// import { waitFrame } from '~/_foundation/utils';
// import Projects from './projects';
import type { AppContext } from '~/_foundation/type';

type Refs = {
  projects: HTMLElement;
};

export default defineComponent({
  name: 'Home',
  setup(_el, context: AppContext) {
    const { history } = context;

    const { addChild: _ } = useSlot();
    const { refs: __ } = useDomRef<Refs>('projects');

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
