import {
  defineComponent,
  useSlot,
  useDomRef,
  useMount,
  useUnmount,
} from "lake";
import { Tween } from "@/_foundation/tween";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "home",
  setup(el, context: AppContext) {
    const { once } = context;

    const { addChild } = useSlot();

    useMount(() => {
      if (once) {
        return;
      }
    });

    useUnmount(() => {
      //
    });
  },
});
