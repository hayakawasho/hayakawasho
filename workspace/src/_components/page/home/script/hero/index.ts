import { defineComponent, useDomRef, useEvent, useSlot } from "lake";
import { useWindowEvent } from "../../../../../_libs/lake/useWindowEvent";
import HeroImage from "./image";

export default defineComponent({
  name: "HomeHero",
  setup(el, context) {
    const { addChild } = useSlot();

    const { refs } = useDomRef<{
      hero: HTMLElement;
      heroImage: HTMLImageElement[];
      heroNavigation: HTMLElement;
      heroThumb: HTMLImageElement[];
    }>("hero", "heroImage", "heroNavigation", "heroThumb");

    addChild(refs.heroImage, HeroImage);

    useEvent(refs.heroNavigation, "touchstart", (evt) => {
      console.log(evt);
    });

    useEvent(refs.heroNavigation, "touchmove", (evt) => {
      console.log(evt);
    });

    useEvent(refs.heroNavigation, "touchend", (evt) => {
      console.log(evt);
    });

    // useWindowEvent("wheel", (evt) => {
    //   console.log(evt);
    // });
  },
});
