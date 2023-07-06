import { defineComponent } from "lake";
import { useImagePlane } from "@/_glsl";
import { useScrollTween } from "@/_states/scroll";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
// import { map } from "@/_foundation/math";
import type { GlobalContext } from "@/_foundation/type";

type Props = Pick<GlobalContext, "glContext">;

export default defineComponent({
  name: "plane",
  setup(domImg: HTMLImageElement, { glContext }: Props) {
    const uniforms = {
      u_scale: {
        value: 1,
      },
      u_velo: {
        value: 0,
      },
    };

    const { plane, state, cache } = useImagePlane({
      el: domImg,
      fragment,
      glContext,
      uniforms,
      vertex,
    });

    useScrollTween(({ currentY, oldY }) => {
      if (state.resizing || !state.visible) {
        return;
      }

      cache.value = {
        ...cache.value,
        currentY,
      };
      plane.update(cache.value);

      const diff = (oldY - currentY) * 0.01;
      uniforms.u_velo.value = diff;
    });
  },
});
