import { defineComponent, useMount, useIntersectionWatch } from "lake";
import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
import { Tween } from "@/_foundation/tween";
import { loadImage } from "@/_foundation/utils";
import { ImagePlane } from "@/_glsl";
import { useScrollPosY } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "Screenshot",
  setup(el: HTMLImageElement, context: AppContext) {
    const { glContext, mq, history } = context;
    const { gl } = glContext;

    const src = el.dataset.src!;
    const state = {
      pc: {
        src: src + "?auto=compress,format",
      },
      resizing: false,
      sp: {
        src: src + "?auto=compress,format&w=750",
      },
      visible: false,
    };

    const texture = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      // premultiplyAlpha: true,
    });

    loadImage(state[mq.value].src).then((img) => {
      texture.image = img;
    });

    const { width, height } = el.getBoundingClientRect();
    const uniforms = {
      u_alpha: {
        value: 1.0,
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

    useScrollPosY(({ currentY, oldY }) => {
      if (state.resizing || !state.visible || currentY === oldY) {
        return;
      }
      imagePlane.updatePos(currentY);
    });

    useMount(() => {
      imagePlane.onResize(ww.value, wh.value);
      glContext.addScene(mesh);

      return () => {
        if (history.value === "pop") {
          glContext.removeScene(mesh);
          return;
        }

        Tween.tween(uniforms.u_alpha, 0.55, "power3.inOut", {
          onComplete: () => {
            glContext.removeScene(mesh);
          },
          value: 0,
        });
      };
    });
  },
});
