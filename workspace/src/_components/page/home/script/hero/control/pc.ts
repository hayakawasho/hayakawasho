import { defineComponent, useDomRef, useEvent, useMount, useSlot } from "lake";
import { useWindowEvent } from "../../../../../../_libs/lake/useWindowEvent";
import type { DefineComponentContext } from "../../../../../../const";
import HeroThumb from "../thumb/pc";
import HeroVisual from "../visual/pc";

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

    const { refs } = useDomRef<Refs>(
      "hero",
      "heroImage",
      "heroNavigation",
      "heroThumbItem",
    );

    const visualContext = addChild(refs.heroItem, HeroVisual);
    const thumbContext = addChild(refs.heroThumbItem, HeroThumb);
  },
});
