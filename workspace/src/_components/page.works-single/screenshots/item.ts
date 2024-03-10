import { defineComponent, useMount, useUnmount } from "lake";
// import { Tween } from '@/_foundation/tween';
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollPosYContext } from "@/_states/scroll";
import { useWindowSizeContext } from "@/_states/window-size";
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
    const { frontCanvasContext, history: _, geo, mat } = context;

    const mq = useMediaQueryContext();

    const [ww, wh] = useWindowSizeContext(({ width, height }) => {
      plane.resize({
        height,
        width,
      });
    });

    const [currentY] = useScrollPosYContext(({ currentY, oldY }) => {
      currentY !== oldY && plane.updateY(currentY);
    });

    const plane = new Plane(el, {
      currentY: currentY.value,
      geo,
      mat,
      mq: mq.value,
      windowSize: {
        height: wh.value,
        width: ww.value,
      },
    });

    useMount(() => {
      frontCanvasContext.addScene(plane);
    });

    useUnmount(() => {
      frontCanvasContext.removeScene(plane);
    });
  },
});
