import { defineComponent } from "lake";
import type { DefineComponentContext } from "../../../../../const";

export default defineComponent({
  name: "SplashScreen",
  setup(_, {}: DefineComponentContext) {
    const onBoot = async () => {
      console.log("start");
    };

    return {
      onBoot,
    };
  },
});
