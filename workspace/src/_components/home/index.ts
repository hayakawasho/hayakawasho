import {
  defineComponent,
  useSlot,
  useDomRef,
  useMount,
  useUnmount,
} from "lake";
import { Tween } from "@/_foundation/tween";
// import Artwork from "./artwork";
import Grid from "./grid";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "home",
  setup(el, context: AppContext) {
    const { once } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<{ grid: HTMLElement }>("grid");

    addChild(refs.grid, Grid, context);

    useMount(() => {
      if (once) {
        return;
      }
    });

    useUnmount(() => {
      Tween.parallel(
        Tween.tween(el, 0.55, "power3.inOut", {
          alpha: 0,
        })
      );
    });
  },
});
