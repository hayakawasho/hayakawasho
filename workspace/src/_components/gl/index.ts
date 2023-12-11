import { defineComponent } from 'lake';
import { useThree } from './use-three';

type Context = {
  resolution: number;
};

export default defineComponent({
  name: 'Gl',
  setup(canvas: HTMLCanvasElement, { resolution }: Context) {
    const { addScene, removeScene } = useThree(canvas, {
      resolution,
    });

    return {
      addScene,
      removeScene,
    };
  },
});
