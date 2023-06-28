import { defineComponent, useSlot } from "lake";
// import PcScroll from "./pc";
// import SpScroll from "./sp";
import type { GlobalContext } from "@/_foundation";

type Props = Pick<GlobalContext, "env">;

export default defineComponent({
  setup(el, { env: _ }: Props) {
    const { addChild: ___ } = useSlot();

    return {
      // ...scrollContext,
    };
  },
  tagName: "Scroll",
});
