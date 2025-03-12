import { defineComponent, useMount, useSlot } from "lake";
import type { DefineComponentContext } from "../../../../const";
import Hero from "./hero";
import SplashScreen from "./splashscreen";

export default defineComponent({
  name: "Home",
  setup(el, props: DefineComponentContext) {
    const { once, history } = props;
    const { addChild, removeChild } = useSlot();

    useMount(() => {
      console.log("mount:Home", props);

      (async () => {
        if (once) {
          const [splashscreenContext] = addChild(el, SplashScreen, props);

          function done() {
            addChild(el, Hero, props);
            removeChild([splashscreenContext]);
          }

          await splashscreenContext.current.onBoot();
          done();
        } else if (!once && history.value === "push") {
          addChild(el, Hero, props);
        } else {
          addChild(el, Hero, props);
        }
      })();

      return () => {
        console.log("unmount:Home", props);
      };
    });
  },
});
