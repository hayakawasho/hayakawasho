import { defineComponent, useDomRef } from "lake";
import NormalizeWheel from "normalize-wheel";
import { useWindowEvent } from "../../../../../_libs/lake/useWindowEvent";
import { Tween } from "../../../../../_libs/tween";
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
