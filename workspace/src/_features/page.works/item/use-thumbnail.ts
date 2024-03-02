import { useEvent, useUnmount } from "lake";
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from "@/_foundation/three";
// import { Tween } from "@/_foundation/tween";
import { useWindowSizeContext } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { Object3D } from "@/_foundation/three";

const loader = new TextureLoader();
loader.crossOrigin = "anonymous";

export const useThumbnail = (el: HTMLElement, parentScene: Object3D) => {
  const imgSrc = el.dataset.src!;
  const imgW = Number(el.dataset.w);
  const imgH = Number(el.dataset.h);

  const [ww, wh] = useWindowSizeContext();

  const texture = loader.load(imgSrc, texture => {
    texture.minFilter = LinearFilter;
    texture.generateMipmaps = false;

    parentScene.add(mesh);
  });

  const uniforms = {
    u_alpha: {
      value: 1,
    },
    u_clipBottom: {
      value: new Vector2(0, 1),
    },
    u_clipTop: {
      value: new Vector2(0, 1),
    },
    u_image_size: {
      value: new Vector2(imgW, imgH),
    },
    u_mesh_size: {
      value: new Vector2(ww.value, wh.value),
    },
    u_offset: {
      value: new Vector2(0, 0),
    },
    u_scale: {
      value: new Vector2(1, 1),
    },
    u_texture: {
      value: texture,
    },
  };

  const geometry = new PlaneBufferGeometry(1, 1);
  const material = new ShaderMaterial({
    fragmentShader: fragment,
    transparent: true,
    uniforms,
    vertexShader: vertex,
  });

  const mesh = new Mesh(geometry, material);

  useEvent(el, "mouseenter", () => {
    //
  });

  useEvent(el, "mouseleave", () => {
    //
  });

  useUnmount(() => {
    parentScene.remove(mesh);
  });
};
