import { defineComponent, useDomRef } from "lake";

type Refs = {
  heroThumbImageWrap: HTMLElement;
  heroThumbImage: HTMLImageElement;
};

export default defineComponent({
  name: "HeroThumb",
  setup(el, context) {
    const { refs } = useDomRef<Refs>("heroThumbImageWrap", "heroThumbImage");
  },
});
