import { defineComponent, useDomRef, useMount } from "lake";
import { useElementSize } from "../../../../../_libs/lake/useElementSize";
import { useTick } from "../../../../../_libs/lake/useTick";
import { useWindowEvent } from "../../../../../_libs/lake/useWindowEvent";
import { ScrollSmoother } from "../../../../../_libs/scroll/smoother";
import { Tween } from "../../../../../_libs/tween";
import type { DefineComponentContext } from "../../../../../const";

type Refs = {
  plane: HTMLImageElement;
};

export default defineComponent({
  name: "ScreenShotItem",
  setup(el, props: DefineComponentContext) {
    const { refs } = useDomRef<Refs>("plane");

    return {};
  },
});
