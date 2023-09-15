import {
  defineComponent,
  useMount,
  useUnmount,
  ref,
  useIntersectionWatch,
} from "lake";
import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
// import { Tween } from "@/_foundation/tween";
import { loadImage } from "@/_foundation/utils";
import { ImagePlane } from "@/_glsl";
import { useScrollTween } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { AppContext } from "@/_foundation/type";

type Cache = {
  rect: DOMRect;
  currentY: number;
  ww: number;
  wh: number;
};

export default defineComponent({
  name: "home.index",
  setup(
    el: HTMLImageElement,
    { glContext, env }: Pick<AppContext, "glContext" | "env">
  ) {
    const cache = ref<Cache>({
      currentY: 0,
      rect: el.getBoundingClientRect(),
      wh: 0,
      ww: 0,
    });

    const state = {
      cy: 0,
      diff: 0,
      dragging: false,
      max: {
        y: 0,
      },
      resizing: false,
      ty: 0,
      visible: false,
    };

    const src = {
      pc: el.dataset.src!,
      sp: el.dataset.srcSp!,
    };

    const imageeSize = {
      w: Number(el.dataset.w)!,
      h: Number(el.dataset.h)!,
    };

    const texture = new Texture(glContext.gl);

    loadImage(src[env.mq]).then((img) => {
      texture.image = img;
    });

    const uniforms = {
      u_alpha: {
        value: 1.0,
      },
      u_diff: {
        value: 0,
      },
      u_image_size: {
        value: new Vec2(imageeSize.w, imageeSize.h),
      },
      u_mesh_size: {
        value: new Vec2(cache.value.rect.width, cache.value.rect.height),
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

    useScrollTween(({ currentY }) => {
      if (state.resizing) {
        return;
      }
      imagePlane.updatePos(currentY);
    });

    useWindowSize(({ ww, wh }) => {
      state.resizing = true;
      imagePlane.resize(ww, wh);
      state.resizing = false;
    });

    useMount(() => {
      glContext.addScene(mesh);
    });

    useUnmount(() => {
      glContext.removeScene(mesh);
    });
  },
});
