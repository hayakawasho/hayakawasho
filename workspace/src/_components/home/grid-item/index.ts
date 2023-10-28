import { defineComponent, useMount, useDomRef } from "lake";
import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
import { useTick } from "@/_foundation/hooks";
// import { Tween } from "@/_foundation/tween";
import { loadImage } from "@/_foundation/utils";
import { ImagePlane } from "@/_glsl";
import { useWindowSize } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { useInfiniteScroll } from "@/_foundation/hooks";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext & {
  infiniteScrollContext: ReturnType<typeof useInfiniteScroll>;
};

export default defineComponent({
  name: "GridItem",
  setup(el: HTMLElement, context: Props) {
    const { glContext, mq, infiniteScrollContext, history } = context;
    const { gl } = glContext;
    const { diff, posY } = infiniteScrollContext;

    const { refs } = useDomRef<{ plane: HTMLImageElement }>("plane");

    const imgSrc = refs.plane.dataset.src!;
    const speed = Number(refs.plane.dataset.speed);

    const state = {
      pc: {
        speed,
        src: imgSrc + "?auto=compress,format&w=1200",
      },
      resizing: false,
      sp: {
        speed,
        src: imgSrc + "?auto=compress,format&w=750",
      },
    };

    const texture = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
    });

    loadImage(state[mq.value].src).then((img) => {
      texture.image = img;
    });

    const { width, height } = refs.plane.getBoundingClientRect();

    const uniforms = {
      u_alpha: {
        value: 1,
      },
      u_image_size: {
        value: new Vec2(
          Number(refs.plane.dataset.w),
          Number(refs.plane.dataset.h)
        ),
      },
      u_mesh_size: {
        value: new Vec2(width, height),
      },
      u_scale: {
        value: 1.0,
      },
      u_texture: {
        value: texture,
      },
      u_velo: {
        value: 0,
      },
    };

    const geometry = new Plane(gl, {
      height: 1,
      width: 1,
    });

    const program = new Program(gl, {
      depthTest: false,
      fragment,
      uniforms,
      vertex,
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    const imagePlane = new ImagePlane(mesh, el);

    const [ww, wh] = useWindowSize(({ ww, wh }) => {
      state.resizing = true;
      imagePlane.onResize(ww, wh);
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }

      const y = infiniteScrollContext.wrap(posY.value * state[mq.value].speed);

      imagePlane.updatePos(y);
      uniforms.u_velo.value = diff.value * 0.005 * state[mq.value].speed;
    });

    useMount(() => {
      imagePlane.onResize(ww.value, wh.value);
      glContext.addScene(mesh);

      return () => {
        if (history.value === "popstate") {
          glContext.removeScene(mesh);
          return;
        }

        glContext.removeScene(mesh);
      };
    });
  },
});
