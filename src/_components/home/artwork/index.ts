import { defineComponent, useDomRef, useMount, useUnmount } from "lake";
import { useTick } from "@/_foundation/hooks";

export default defineComponent({
  name: "artwork",
  setup(_el) {
    const dpr = Math.min(window.devicePixelRatio, 1);
    const { refs } = useDomRef<{ artworkCanvas: HTMLCanvasElement }>(
      "artworkCanvas"
    );

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
