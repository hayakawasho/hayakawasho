import { defineComponent, useDomRef, useEvent, useMount, useSlot } from "lake";
import { useWindowEvent } from "../../../../../../_libs/lake/useWindowEvent";
import type { DefineComponentContext } from "../../../../../../const";
import HomeHeroThumb from "../thumb//sp";
import HomeHeroVisual from "../visual/sp";

type Refs = {
  hero: HTMLElement;
  heroImage: HTMLImageElement[];
  heroNavigation: HTMLElement;
  heroThumb: HTMLImageElement[];
};

export default defineComponent({
  name: "HomeHeroControl",
  setup(el, props: DefineComponentContext) {
    const { addChild } = useSlot();

    const { refs } = useDomRef<Refs>(
      "hero",
      "heroImage",
      "heroNavigation",
      "heroThumb",
    );

    addChild(refs.heroImage, HomeHeroVisual);
    addChild(refs.heroThumb, HomeHeroThumb);
  },
});
