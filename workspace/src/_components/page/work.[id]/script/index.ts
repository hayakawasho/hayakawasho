import { defineComponent, useSlot } from "lake";
import Info from "./info";

export default defineComponent({
  name: "WorkSingle",
  setup(el, context) {
    console.log("WorkSingle:", context);

    const { addChild } = useSlot();

    addChild(el, Info);
  },
});
