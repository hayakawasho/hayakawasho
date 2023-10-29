import { useMount, useEvent } from "lake";
import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
// import { useTick } from "@/_foundation/hooks";
// import { Tween } from "@/_foundation/tween";
import { loadImage } from "@/_foundation/utils";
import { useWindowSize } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { AppContext } from "@/_foundation/type";

export const useThumbnail = (
  el: HTMLElement,
  glContext: AppContext["glContext"]
) => {
  const { gl } = glContext;

  const imageSrc = el.dataset.image!;
  const [imageWidth, imageHeight] = JSON.parse(el.dataset.imageSize!);

  const [ww, wh] = useWindowSize();

  const texture = new Texture(gl, {
    generateMipmaps: false,
    height: 9,
    width: 16,
  });

  loadImage(imageSrc).then((img) => {
    texture.image = img;
  });

  const uniforms = {
    u_alpha: {
      value: 1,
    },
    u_clipBottom: {
      value: new Vec2(0, 1),
    },
    u_clipTop: {
      value: new Vec2(0, 1),
    },
    u_image_size: {
      value: new Vec2(imageWidth, imageHeight),
    },
    u_mesh_size: {
      value: new Vec2(ww.value, wh.value),
    },
    u_offset: {
      value: new Vec2(0, 0),
    },
    u_scale: {
      value: new Vec2(1, 1),
    },
    u_texture: {
      value: texture,
    },
  };

  const geometry = new Plane(gl, {
    height: 1,
    width: 1,
  });

  const program = new Program(gl, {
    cullFace: null,
    depthTest: true,
    depthWrite: false,
    fragment,
    transparent: true,
    uniforms,
    vertex,
  });

  const mesh = new Mesh(gl, {
    geometry,
    program,
  });

  useEvent(el, "mouseenter", () => {
    //
  });

  useEvent(el, "mouseleave", () => {
    //
  });

  useMount(() => {
    glContext.addScene(mesh);

    return () => {
      glContext.removeScene(mesh);
    };
  });
};
