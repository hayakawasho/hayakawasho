import { gsap } from "gsap";
import {
  defineComponent,
  useMount,
  useUnmount,
  useIntersectionWatch,
} from "lake";
import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
import { useTick } from "@/_foundation/hooks";
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
  name: "home.plane",
  setup(el: HTMLImageElement, context: Props) {
    const { glContext, env, maxY, posY, diff } = context;
    const { gl } = glContext;

    const index = Number(el.dataset.index);
    const src = el.dataset.src!;

    const state = {
      resizing: false,
      visible: false,
      pc: {
        src: {
          1: src + "?auto=compress,format",
          2: src + "?auto=compress,format",
          3: src + "?auto=compress,format",
          0: src + "?auto=compress,format",
        }[index % 3]!,
        speed: {
          1: 1,
          2: 0.92,
          3: 0.86,
          0: 0.78,
        }[index % 4]!,
      },
      sp: {
        src: {
          1: src + "?auto=compress,format&w=750&sat=-100",
          2: src + "?auto=compress,format&w=750",
          0: src + "?auto=compress,format&w=750&sat=-100",
        }[index % 3]!,
        speed: {
          1: 0.9,
          2: 1,
          0: 0.9,
        }[index % 3]!,
      },
    };

    const texture = new Texture(gl);

    loadImage(state[env.mq].src).then((img) => {
      texture.image = img;
    });

    const { width, height } = el.getBoundingClientRect();
    const uniforms = {
      u_diff: {
        value: 0,
      },
      u_image_size: {
        value: new Vec2(Number(el.dataset.w), Number(el.dataset.h)),
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
      u_time: {
        value: 0,
      },
      u_velo: {
        value: 0,
      },
    };

    const geometry = new Plane(gl);
    const program = new Program(gl, {
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
      imagePlane.resize(ww, wh);
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
      imagePlane.updatePos(y);

      uniforms.u_velo.value = diff.value * 0.014 * state[env.mq].speed;
      uniforms.u_diff.value = Math.abs(diff.value * 0.0005);
    });

    useMount(() => {
      imagePlane.resize(ww.value, wh.value);
      glContext.addScene(mesh);
    });

    useUnmount(() => {
      glContext.removeScene(mesh);
    });
  },
});
