import { defineComponent, useDomRef, useSlot, withSvelte } from 'lake';
// import Menu from './view.svelte';
import type { AppContext } from '~/_foundation/type';

type Refs = {
  menu: HTMLElement;
};

export default defineComponent({
  name: 'NavMenu',
  setup(el, context: AppContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>('menu');

    //addChild(refs.menu, withSvelte(Menu), {
    //  ...context,
    //  current: el.dataset.current,
    //});
  },
});
