import { defineComponent, useDomRef, useEvent, useMount, useSlot } from "lake";
import { useWindowEvent } from "../../../../../_libs/lake/useWindowEvent";
import type { DefineComponentContext } from "../../../../../const";
import HomeHeroVisual from "./visual/pc";
import { useHero } from "./useHero";

type Refs = {
  hero: HTMLElement;
  heroImage: HTMLImageElement[];
  heroNavigation: HTMLElement;
  heroThumb: HTMLImageElement[];
};

export default defineComponent({
  name: "HomeHero",
  setup(el, props: DefineComponentContext) {
    const {} = useHero();

    // useEvent(refs.heroNavigation, "touchstart", (evt) => {
    //   console.log(evt);
    // });
    //
    // useEvent(refs.heroNavigation, "touchmove", (evt) => {
    //   console.log(evt);
    // });
    //
    // useEvent(refs.heroNavigation, "touchend", (evt) => {
    //   console.log(evt);
    // });

    // useWindowEvent("wheel", (evt) => {
    //   console.log(evt);
    // });

    // const slide = new Glide(refs.hero, { startAt: 0 }).mutate([
    //   (Glide: any, Components: any, Events: any) => {
    //     return {
    //       modify(translate: number) {
    //         //
    //       },
    //     };
    //   },
    // ] as Glide.TransformerFunction[]);

    // useMount(() => {
    //   slide.mount({});
    //
    //   return () => {
    //     slide.destroy();
    //   };
    // });
  },
});
