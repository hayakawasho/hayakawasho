import { defineComponent, useDomRef } from "lake";
import type { DefineComponentContext } from "../../../../../../../const";

type Refs = {
  heroVisual: HTMLImageElement;
};

export default defineComponent({
  name: "HeroVisualItem",
  setup(_el, props: DefineComponentContext) {
    const { glFrontContext } = props;

    const { refs } = useDomRef<Refs>("plane");
  },
});
