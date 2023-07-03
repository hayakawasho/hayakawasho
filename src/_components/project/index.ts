import { defineComponent, useDomRef, useSlot } from "lake";
import H1 from "./h1";
import type { GlobalContext } from "@/_foundation/type";

export default defineComponent({
  name: "project",
  setup(_, { glContext }: GlobalContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<{
      h1: HTMLElement;
      screenshot: HTMLImageElement[];
    }>("h1", "screenshot");

    console.log(refs.screenshot);

    addChild(refs.h1, H1, {
      glContext,
    });
  },
});
