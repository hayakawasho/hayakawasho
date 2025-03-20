import { defineComponent, useDomRef } from "lake";
import type { DefineComponentContext } from "../../../../../../../const";

type Refs = {
  heroVisual: HTMLElement;
};

export default defineComponent({
  name: "HeroVisual",
  setup(el, props: DefineComponentContext) {
    const { refs } = useDomRef<Refs>("heroVisual");

    // assetLoader(refs.heroVisual.dataset.src as string);
  },
});
