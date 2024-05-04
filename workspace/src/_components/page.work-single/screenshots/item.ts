import { defineComponent, useMount } from "lake";
// import { Tween } from '@/_foundation/tween';
import { useMediaQueryContext } from "@/_states/mq";
// import { useScrollStateContext } from "@/_states/scroll";
import { useWindowSizeContext } from "@/_states/window-size";
import { useTick } from "@/_foundation/hooks";
import { Plane } from "./plane";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import type { AppContext } from "@/_foundation/type";

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

    const [windowWidth, windowHeight] = useWindowSizeContext(payload => {
      state.resizing = true;
      plane.updateCache({ offset: scrollContext.scrollTop() });
      plane.resize(payload);
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
      geo,
      mat,
      device,
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
