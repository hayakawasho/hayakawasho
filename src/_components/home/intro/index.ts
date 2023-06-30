import { defineComponent, useDomRef, useMount, useUnmount } from "lake";
import { useTick } from "@/_foundation";

export default defineComponent({
  name: "home.intro",
  setup(_el) {
    const { refs } = useDomRef<{ introCanvas: HTMLCanvasElement }>(
      "introCanvas"
    );

    useTick(({ timestamp }) => {
      //
    });

    useMount(() => {
      //
    });

    useUnmount(() => {
      //
    });
  },
});
