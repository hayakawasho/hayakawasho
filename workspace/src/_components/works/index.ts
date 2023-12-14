import { defineComponent, useSlot, useDomRef, useMount } from 'lake';
import { useInfiniteScroll, useTick } from '@/_foundation/hooks';
import { lerp, map } from '@/_foundation/math';
import { Object3D } from '@/_foundation/three';
import { useMousePos } from '@/_states/mouse';
import { useWindowSize } from '@/_states/window-size';
import Item from './item';
import type { AppContext } from '@/_foundation/type';

type Refs = {
  items: HTMLElement;
  item: HTMLElement[];
};

export default defineComponent({
  name: 'Works',
  setup(_el, context: AppContext) {
    const { backCanvasContext } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>('items', 'item');

    const infiniteScrollContext = useInfiniteScroll(refs.items, context.mq.value);

    const [ww, wh] = useWindowSize(({ ww, wh }) => {
      state.centerX = ww * 0.5;
      state.centerY = wh * 0.5;
    });

    const state = {
      centerX: ww.value * 0.5,
      centerY: wh.value * 0.5,
      lastX: 0,
      lastY: 0,
    };

    const [mouseX, mouseY] = useMousePos();
    const parentScene = new Object3D();

    useTick(({ timeRatio }) => {
      const easeVal = 1 - (1 - 0.12) ** timeRatio;

      state.lastX = lerp(state.lastX, mouseX.value, easeVal);
      state.lastY = lerp(state.lastY, mouseY.value, easeVal);

      parentScene.position.x = map(state.lastX, 0, ww.value, -state.centerX, state.centerX);
      parentScene.position.y = -map(state.lastY, 0, wh.value, -state.centerY, state.centerY);
    });

    const aspect = 2560 / 1440;
    parentScene.scale.set(aspect * 320, 320, 1);

    addChild(refs.item, Item, {
      ...context,
      infiniteScrollContext,
      parentScene,
    });

    useMount(() => {
      backCanvasContext.addScene(parentScene);

      return () => {
        backCanvasContext.removeScene(parentScene);
      };
    });
  },
});
