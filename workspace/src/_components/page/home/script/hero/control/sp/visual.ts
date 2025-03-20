import { defineComponent, useDomRef } from "lake";

type Refs = {
  heroThumbImageWrap: HTMLElement;
  heroThumbImage: HTMLImageElement[];
};

export default defineComponent({
  name: "HeroVisual",
  setup(el, context) {
    const { refs } = useDomRef<Refs>("hero", "heroImage", "heroNavigation", "heroThumbItem");
  },
});
