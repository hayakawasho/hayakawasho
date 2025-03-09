import { defineComponent, useDomRef, useMount, useSlot } from "lake";
import type { DefineComponentContext } from "../../../../const";
import Info from "./info";
import PcScreenShots from "./screenshots/pc";
import SpScreenShots from "./screenshots/sp";

type Refs = {
  screenshots: HTMLElement;
};

export default defineComponent({
  name: "WorkSingle",
  setup(el, props: DefineComponentContext) {
    const { device } = props;

    const { refs } = useDomRef<Refs>("screenshots");

    const { addChild } = useSlot();

    if (device === "sp") {
      addChild(el, Info);
      // addChild(refs.screenshots, SpScreenShots);
    } else {
      addChild(refs.screenshots, PcScreenShots);
    }

    useMount(() => {
      console.log("mount:WorkSingle", props);

      return () => {
        console.log("unmount:WorkSingle", props);
      };
    });
  },
});
