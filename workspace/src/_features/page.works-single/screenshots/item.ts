import { defineComponent, useMount, useUnmount } from 'lake';
// import { Tween } from '~/_foundation/tween';
import { useMediaQuery } from '~/_states/mq';
import { useScrollPosY } from '~/_states/scroll';
import { useWindowSize } from '~/_states/window-size';
import { Plane } from './plane';
import type { PlaneBufferGeometry, ShaderMaterial } from '~/_foundation/three';
import type { AppContext } from '~/_foundation/type';

export default defineComponent({
  name: 'Screenshot',
  setup(
    el: HTMLImageElement,
    context: {
      geo: PlaneBufferGeometry;
      mat: ShaderMaterial;
    } & AppContext
  ) {
    const { frontCanvasContext, history, geo, mat } = context;

    const mq = useMediaQuery();

    const [ww, wh] = useWindowSize(({ width, height }) => {
      plane.resize({
        height,
        width,
      });
    });

    const [currentY] = useScrollPosY(({ currentY, oldY }) => {
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
