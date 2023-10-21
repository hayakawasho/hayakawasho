import { defineComponent, useMount } from "lake";
// import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
// import { useTick } from "@/_foundation/hooks";
// import { Tween } from "@/_foundation/tween";
// import { loadImage } from "@/_foundation/utils";
// import { useWindowSize } from "@/_states/window-size";
// import fragment from "./fragment.frag";
// import vertex from "./vertex.vert";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext;

export default defineComponent({
  name: "Thumbnail",
  setup(el: HTMLElement, context: Props) {
    if (context.env.mq === "sp") {
      return;
    }

    const images = el.dataset.images!.split(", ");

    const onMouseEnter = (e: MouseEvent) => {
      //
    };

    const onMouseLeave = (e: MouseEvent) => {
      //
    };

    useMount(() => {
      return () => {
        //
      };
    });

    return {
      onMouseEnter,
      onMouseLeave,
    };
  },
});
