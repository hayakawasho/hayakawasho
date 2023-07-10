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
  setup(_el, { glContext, initialMount }: GlobalContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<{
      plane: HTMLImageElement[];
      artwork: HTMLElement;
      name: HTMLElement[];
    }>("plane", "artwork", "name");

    // addChild(refs.artwork, Artwork);
    addChild(refs.plane, ImagePlane, {
      glContext,
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
        Tween.tween(refs.artwork, 0.6, "power3.inOut", {
          alpha: 0,
        }),
        Tween.tween(refs.name, 1.2, "expo.out", {
          y: "-110%",
          delay: 0.1,
        })
      );
    });
  },
});
