import { defineComponent, useDomRef, useSlot } from "lake";
import type { DefineComponentContext } from "../../../../../../const";
import HeroThumb from "./pc/thumb";
import HeroVisual from "./pc/visual";

type Refs = {
  hero: HTMLElement;
  heroItem: HTMLElement[];
  heroNavigation: HTMLElement;
  heroThumbItem: HTMLElement[];
};

export default defineComponent({
  name: "HeroControl",
  setup(el, props: DefineComponentContext) {
    const { addChild } = useSlot();

    const { refs } = useDomRef<Refs>("hero", "heroImage", "heroNavigation", "heroThumbItem");

    const visualContext = addChild(refs.heroItem, HeroVisual);
    const thumbContext = addChild(refs.heroThumbItem, HeroThumb);
  },
});
