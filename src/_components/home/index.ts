import { defineComponent, useSlot, useDomRef } from "lake";
// import Artwork from "./artwork";
import ImagePlane from "./plane";
import type { GlobalContext } from "@/_foundation/type";

export default defineComponent({
  name: "home",
  setup(_el, { glContext }: GlobalContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<{
      plane: HTMLImageElement[];
      artwork: HTMLElement;
    }>("plane", "artwork");

    // addChild(refs.artwork, Artwork);
    addChild(refs.plane, ImagePlane, {
      glContext,
    });
  },
});
