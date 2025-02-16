import { defineComponent, useSlot } from "lake";
import Hero from "./hero";

export default defineComponent({
  name: "Home",
  setup(el, context) {
    console.log("Home:", context);

    const { addChild } = useSlot();

    addChild(el, Hero);
  },
});
