import { defineComponent, useDomRef, useMount, useUnmount } from "lake";
import { useTick } from "@/_foundation/hooks";

export default defineComponent({
  name: "home.intro",
  setup(_el) {
    const { refs } = useDomRef<{ introCanvas: HTMLCanvasElement }>(
      "introCanvas"
    );

    console.log(refs.introCanvas);

    useTick(() => {
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
