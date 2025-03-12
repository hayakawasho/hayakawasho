import { defineComponent, useDomRef, useSlot } from "lake";
import { useTick } from "../../../../../../_libs/lake/useTick";
import { useWindowEvent } from "../../../../../../_libs/lake/useWindowEvent";

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
