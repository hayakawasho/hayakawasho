import { defineComponent, useSlot, useDomRef } from "lake";
import Intro from "./intro";
import ImagePlane from "../image-plane";
import type { GlobalContext } from "@/_foundation/type";

export default defineComponent({
  name: "home",
  setup(_el, props: GlobalContext) {
    const { glContext } = props;

    const { refs } = useDomRef<{
      plane: HTMLImageElement[];
      intro: HTMLElement;
    }>("plane", "intro");
    const { addChild } = useSlot();

    addChild(refs.intro, Intro);
    addChild(refs.plane, ImagePlane, {
      glContext,
    });
  },
});
