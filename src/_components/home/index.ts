import {
  defineComponent,
  useSlot,
  useDomRef,
  useMount,
  useUnmount,
} from "lake";
// import Artwork from "./artwork";
import ImagePlane from "./plane";
import { Tween } from "@/_foundation/tween";
import type { GlobalContext } from "@/_foundation/type";

export default defineComponent({
  name: "home",
  setup(el, { glContext, initialMount, env }: GlobalContext) {
    const { addChild } = useSlot();

    const { refs } = useDomRef<{
      plane: HTMLImageElement[];
      artwork: HTMLElement;
      name: HTMLElement[];
    }>("plane", "artwork", "name");

    // addChild(refs.artwork, Artwork);
    addChild(refs.plane, ImagePlane, {
      glContext,
      env,
    });

    useMount(() => {
      if (initialMount) {
        return;
      }

      Tween.prop(refs.artwork, {
        alpha: 0,
      });
      Tween.tween(refs.artwork, 0.7, "power2.inOut", {
        alpha: 1,
      });
    });

    useUnmount(() => {
      Tween.parallel(
        Tween.tween(el, 0.6, "power3.inOut", {
          alpha: 0,
        })
      );
    });
  },
});
