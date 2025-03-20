import { defineComponent, useDomRef } from "lake";
import type { DefineComponentContext } from "../../../../../const";

type Refs = {
  screenshotItem: HTMLElement[];
};

export default defineComponent({
  name: "ScreenShots",
  setup(el, props: DefineComponentContext) {
    const { refs } = useDomRef<Refs>("screenshotItem");
    //
  },
});
