import { defineComponent, useSlot } from "lake";
import type { DefineComponentContext } from "../../../../../const";
import PcHomeHeroControl from "./control/pc";
import SpHomeHeroControl from "./control/sp";

export default defineComponent({
  name: "HomeHero",
  setup(el, props: DefineComponentContext) {
    const { device } = props;

    const { addChild } = useSlot();

    device === "pc"
      ? addChild(el, PcHomeHeroControl, props)
      : addChild(el, SpHomeHeroControl, props);
  },
});
