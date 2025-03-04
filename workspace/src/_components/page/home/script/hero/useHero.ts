import { useDomRef, useEvent, useMount, useSlot } from "lake";
import HomeHeroVisual from "./visual/pc";

type Refs = {
  hero: HTMLElement;
  heroImage: HTMLImageElement[];
  heroNavigation: HTMLElement;
  heroThumb: HTMLImageElement[];
};

export function useHero() {
  const { addChild } = useSlot();

  const { refs } = useDomRef<Refs>(
    "hero",
    "heroImage",
    "heroNavigation",
    "heroThumb",
  );

  addChild(refs.heroImage, HomeHeroVisual);

  return {
    //
  };
}
