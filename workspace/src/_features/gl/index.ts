import { defineComponent } from 'lake';
import { useThree } from './use-three';

type Context = {
  resolution: number;
};

export default defineComponent({
  name: 'Gl',
  setup(canvas: HTMLCanvasElement, { resolution = 1 }: Context) {
    const { addScene, removeScene } = useThree(canvas, resolution);

    return {
      addScene,
      removeScene,
    };
  },
});
