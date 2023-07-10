import {
  defineComponent,
  useMount,
  useUnmount,
  ref,
  useIntersectionWatch,
} from "lake";
import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
import { noop } from "@/_foundation/utils";
import { Tween } from "@/_foundation/tween";
import { ImagePlane } from "@/_glsl";
import { useScrollTween } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
// import { map } from "@/_foundation/math";
import type { GlobalContext } from "@/_foundation/type";

type Cache = {
  rect: DOMRect;
  currentY: number;
  ww: number;
  wh: number;
};

type Props = {} & Pick<GlobalContext, "glContext" | "env">;

export default defineComponent({
  name: "plane",
  setup(el: HTMLImageElement, { glContext, env }: Props) {
    const [ww, wh] = useWindowSize(noop);

    const cache = ref<Cache>({
      currentY: 0,
      rect: el.getBoundingClientRect(),
      wh: wh.value,
      ww: ww.value,
    });

    const state = {
      resizing: false,
      visible: false,
    };

    const texture = new Texture(glContext.gl);

    const src = {
      pc: el.dataset.src!,
      sp: el.dataset.srcSp!,
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src[env.mq];
    img.decode().then(() => {
      texture.image = img;
    });

    const uniforms = {
      u_image_size: {
        value: new Vec2(0, 0),
      },
      u_mesh_size: {
        value: new Vec2(ww.value, wh.value),
      },
      u_scale: {
        value: 1,
      },
      u_texture: {
        value: texture,
      },
      u_velo: {
        value: 0,
      },
      u_alpha: {
        value: 1,
      },
    };

    const geometry = new Plane(glContext.gl);
    const program = new Program(glContext.gl, {
      fragment,
      uniforms,
      vertex,
    });

    const mesh = new Mesh(glContext.gl, {
      geometry,
      program,
    });

    const imagePlane = new ImagePlane(mesh);

    useIntersectionWatch(
      el,
      ([entry]) => {
        state.visible = entry.isIntersecting;
      },
      {
        rootMargin: "25%",
      }
    );

    useScrollTween(({ currentY, oldY }) => {
      if (state.resizing || !state.visible) {
        return;
      }

      cache.value = {
        ...cache.value,
        currentY,
      };

      imagePlane.update(cache.value);

      const diff = (oldY - currentY) * 0.01;
      uniforms.u_velo.value = diff;
    });

    useMount(() => {
      glContext.addScene(mesh);
    });

    useUnmount(() => {
      Tween.tween(uniforms.u_alpha, 0.6, "power2.inOut", {
        value: 0,
        onComplete: () => {
          glContext.removeScene(mesh);
        },
      });
    });
  },
});
