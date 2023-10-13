import { gsap } from "gsap";
import {
  defineComponent,
  useMount,
  useUnmount,
  useIntersectionWatch,
  useDomRef,
} from "lake";
import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
import { useTick } from "@/_foundation/hooks";
// import { Tween } from "@/_foundation/tween";
import { loadImage } from "@/_foundation/utils";
import { ImagePlane } from "@/_glsl";
import { useWindowSize } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { AppContext } from "@/_foundation/type";
import type { ReadonlyRef } from "lake";

type Props = Pick<AppContext, "glContext" | "env"> & {
  maxY: ReadonlyRef<number>;
  posY: ReadonlyRef<number>;
  diff: ReadonlyRef<number>;
};

export default defineComponent({
  name: "GridItem",
  setup(el: HTMLElement, context: Props) {
    const { glContext, env, maxY, posY, diff } = context;
    const { gl } = glContext;

    const { refs } = useDomRef<{ plane: HTMLImageElement }>("plane");

    const src = refs.plane.dataset.src!;
    const speed = Number(refs.plane.dataset.speed);

    const state = {
      pc: {
        speed,
        src: src + "?auto=compress,format",
      },
      resizing: false,
      sp: {
        speed,
        src: src + "?auto=compress,format",
      },
      visible: false,
    };

    const texture = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
    });

    loadImage(state[env.mq].src).then((img) => {
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
      heightSegments: 25,
      widthSegments: 25,
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

    useIntersectionWatch(
      el,
      ([entry]) => {
        state.visible = entry.isIntersecting;
      },
      {
        rootMargin: "25%",
      }
    );

    const [ww, wh] = useWindowSize(({ ww, wh }) => {
      state.resizing = true;

      imagePlane.onResize(ww, wh);

      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }

      const y = gsap.utils.wrap(
        0,
        maxY.value,
        posY.value * state[env.mq].speed
      );

      el.style.transform = `translateY(${-y}px) translateZ(0)`;
      imagePlane.updatePos(y);
      uniforms.u_velo.value = diff.value * 0.005 * state[env.mq].speed;
    });

    useMount(() => {
      imagePlane.onResize(ww.value, wh.value);
      glContext.addScene(mesh);
    });

    useUnmount(() => {
      glContext.removeScene(mesh);

      // Tween.tween(uniforms.u_alpha, 0.65, "expo.out", {
      //   value: 0,
      //   onComplete: () => {
      //     glContext.removeScene(mesh);
      //   },
      // });
    });
  },
});
