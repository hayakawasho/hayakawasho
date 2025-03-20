import { defineComponent, useDomRef, useMount } from "lake";
import type { DefineComponentContext } from "../../../../../const";
import { useScreenShotPlane } from "./useScreenShotPlane";

type Refs = {
  plane: HTMLImageElement;
};

export default defineComponent({
  name: "ScreenShotItem",
  setup(_el, props: DefineComponentContext) {
    const { glFrontContext } = props;

    console.log(glFrontContext);

    const { refs } = useDomRef<Refs>("plane");
    const { plane, uniforms } = useScreenShotPlane(refs.plane);

    glFrontContext.addScene(plane);

    useMount(() => {
      return () => {
        glFrontContext.removeScene(plane);
      };
    });

    function updateX(x: number) {
      plane.updateX(x);
    }

    return {
      updateX,
    };
  },
});
