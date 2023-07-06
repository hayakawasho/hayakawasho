import { defineComponent } from "lake";
import { useScrollTween } from "@/_states/scroll";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import { useImagePlane } from "@/_glsl";
// import { map } from "@/_foundation/math";
import type { GlobalContext } from "@/_foundation/type";

type Props = Pick<GlobalContext, "glContext">;

export default defineComponent({
  name: "plane",
  setup(domImg: HTMLImageElement, { glContext }: Props) {
    const uniforms = {
      uTime: {
        value: 0,
      },
      uScale: {
        value: 1,
      },
      uVelo: {
        value: 0,
      },
    };

    const { plane, state, cache } = useImagePlane({
      el: domImg,
      glContext,
      uniforms,
      fragment,
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
      uniforms.uVelo.value = diff;

      // const scale = map(
      //   currentY,
      //   cache.value.rect.top - wh.value,
      //   cache.value.rect.top + wh.value * 0.5,
      //   0.85,
      //   1.0
      // );
      // uniforms.uScale.value = scale;
    });
  },
});
