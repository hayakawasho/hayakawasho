import { defineComponent, useMount } from "lake";
import { useTick } from "~/_foundation/hooks";
import { useMediaQueryContext } from "~/_states/mq";
import { useWindowSizeContext } from "~/_states/window-size";
// import { Tween } from '~/_foundation/tween';
// import { useScrollStateContext } from "~/_states/scroll";
import { Plane } from "./plane";
import type { AppContext } from "~/_foundation/type";
import type { PlaneBufferGeometry, ShaderMaterial } from "~/_gl/three";

type Props = AppContext & {
  geo: PlaneBufferGeometry;
  mat: ShaderMaterial;
};

export default defineComponent({
  name: "Screenshot",
  setup(el: HTMLImageElement, context: Props) {
    const { frontCanvasContext, scrollContext, history: _, geo, mat } = context;

    const state = {
      resizing: false,
    };

    const { device } = useMediaQueryContext();

    const [windowWidth, windowHeight] = useWindowSizeContext(({ width, height }) => {
      state.resizing = true;
      plane.resize({
        width,
        height,
        y: scrollContext.scrollTop(),
      });
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }
      plane.updateY(scrollContext.scrollTop());
    });

    const plane = new Plane(el, {
      currentY: scrollContext.scrollTop(),
      device,
      geo,
      mat,
      windowWidth: windowWidth.value,
      windowHeight: windowHeight.value,
    });

    useMount(() => {
      frontCanvasContext.addScene(plane);

      return () => {
        frontCanvasContext.removeScene(plane);
      };
    });
  },
});
