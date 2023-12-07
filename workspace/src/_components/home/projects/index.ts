import { defineComponent, useMount, useDomRef, useSlot } from 'lake';
import { useTick } from '@/_foundation/hooks';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from '@/_foundation/three';
import { Tween } from '@/_foundation/tween';
import { Object3D } from '@/_foundation/three';
import { useWindowSize } from '@/_states/window-size';
import { useMousePos } from '@/_states/mouse';
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
    const { glContext, mq, infiniteScrollContext, history } = context;
    // const { diff, posY } = infiniteScrollContext;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>('projectItem');

    const group = new Object3D();

    useMount(() => {
      glContext.addScene(group);

      return () => {
        glContext.removeScene(group);
      };
    });
  },
});
