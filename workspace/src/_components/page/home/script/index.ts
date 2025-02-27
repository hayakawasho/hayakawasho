import { defineComponent, useMount, useSlot } from "lake";
import Hero from "./hero";

export default defineComponent({
  name: "Home",
  setup(el, context: { history: { value: "push" | "pop" }, once: boolean }) {
    const { once, history } = context
    const { addChild } = useSlot();

    useMount(() => {
      console.log("mount:Home", context);

      (async () => {
        if (once) {
          const done = async () => {
            addChild(el, Hero);
          };

          done();
        } else if (!once && history.value === "push") {
          addChild(el, Hero);
        } else {
          addChild(el, Hero);
        }
      })();

      return () => {
        console.log("unmount:Home", context);
      };
    });
  },
});
