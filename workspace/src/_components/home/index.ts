import {
  defineComponent,
  useSlot,
  useDomRef,
  useMount,
  useUnmount,
} from "lake";
import { Tween } from "@/_foundation/tween";
// import Artwork from "./artwork";
import Index from "./index/index";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "home",
  setup(el, { glContext, once, env }: AppContext) {
    const { addChild } = useSlot();

    const { refs } = useDomRef<{
      plane: HTMLImageElement[];
    }>("plane");

    addChild(refs.plane, Index, {
      glContext,
      env,
    });

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
