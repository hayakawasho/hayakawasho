import { defineComponent, useMount, useDomRef, useSlot } from 'lake';
import { useTick } from '@/_foundation/hooks';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
  Object3D,
} from '@/_foundation/three';
import { Tween } from '@/_foundation/tween';
import { useMousePos } from '@/_states/mouse';
import { useWindowSize } from '@/_states/window-size';
// import fragment from "./cylinder.frag";
// import vertex from "./cylinder.vert";
import type { useInfiniteScroll } from '@/_foundation/hooks';
import type { AppContext } from '@/_foundation/type';

type Props = AppContext & {
  infiniteScrollContext: ReturnType<typeof useInfiniteScroll>;
};

type Refs = {
  projectItem: HTMLElement[];
};

export default defineComponent({
  name: 'Projects',
  setup(el: HTMLElement, context: Props) {
    const { frontCanvasContext, infiniteScrollContext, history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>('projectItem');

    const parentScene = new Object3D();

    const [mouseX, mouseY] = useMousePos();

    useTick(({ timeRatio }) => {
      //
    });

    useMount(() => {
      frontCanvasContext.addScene(parentScene);

      return () => {
        frontCanvasContext.removeScene(parentScene);
      };
    });
  },
});
