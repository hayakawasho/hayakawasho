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
import type { GlobalContext } from "@/_foundation/type";

type Cache = {
  rect: DOMRect;
  currentY: number;
  ww: number;
  wh: number;
};

export default defineComponent({
  name: "project.screenshot",
  setup(el: HTMLImageElement, { glContext, env }: GlobalContext) {
    const [ww, wh] = useWindowSize();

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

    const img = loadImage(src[env.mq], () => {
      texture.image = img;
      uniforms.u_image_size.value.set(img.naturalWidth, img.naturalHeight);

      imagePlane.update(cache.value);
    });

    const uniforms = {
      fogColor: {
        // value: new i.Ilk(),
      },
      fogFar: {
        value: 0,
      },
      fogNear: {
        value: 0,
      },
      u_edgeFade: {
        value: 1,
      },
      u_enableBend: {
        value: false,
      },
      u_image_size: {
        value: new Vec2(0, 0),
      },
      u_innerScale: {
        value: 1,
      },
      u_innerX: {
        value: 0,
      },
      u_innerY: {
        value: 0,
      },
      u_mesh_size: {
        value: new Vec2(cache.value.rect.width, cache.value.rect.height),
      },
      u_opacity: {
        value: 1,
      },
      u_progress: {
        value: 0,
      },
      u_screenCenterTexture: {
        value: 0,
      },
      u_size: {
        value: [1, 1],
      },
      u_texture: {
        value: texture,
      },
      u_texture2: {
        value: null,
      },
      u_time: {
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
      if (state.resizing || !state.visible || currentY === oldY) {
        return;
      }

      cache.value = {
        ...cache.value,
        currentY,
      };

      imagePlane.update(cache.value);
    });

    useMount(() => {
      glContext.addScene(mesh);
    });

    useUnmount(() => {
      glContext.removeScene(mesh);
    });
  },
});
