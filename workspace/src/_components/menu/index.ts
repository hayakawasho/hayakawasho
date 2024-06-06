import { defineComponent, useDomRef, useSlot, withSvelte as _withSvelte } from "lake";
// import Menu from './view.svelte';
import type { AppContext } from "~/_foundation/type";

type Refs = {
  menu: HTMLElement;
};

export default defineComponent({
  name: "NavMenu",
  setup(_el, _context: AppContext) {
    const { addChild: _ } = useSlot();
    const { refs: __ } = useDomRef<Refs>("menu");

    //addChild(refs.menu, withSvelte(Menu), {
    //  ...context,
    //  current: el.dataset.current,
    //});
  },
});
