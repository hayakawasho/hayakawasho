import { useMount, useEvent } from 'lake';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from 'three';
// import { useTick } from "@/_foundation/hooks";
// import { Tween } from "@/_foundation/tween";
import { useWindowSize } from '@/_states/window-size';
import fragment from './fragment.frag';
import vertex from './vertex.vert';
import type { AppContext } from '@/_foundation/type';

const loader = new TextureLoader();
loader.crossOrigin = 'anonymous';

export const useThumbnail = (el: HTMLElement, glContext: AppContext['glContext']) => {
  const image = el.dataset.image!;
  const [imageWidth, imageHeight] = JSON.parse(el.dataset.imageSize!);

  const [ww, wh] = useWindowSize();

  const texture = loader.load(image, texture => {
    texture.minFilter = LinearFilter;
    texture.generateMipmaps = false;
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
      value: new Vector2(imageWidth, imageHeight),
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

  useEvent(el, 'mouseenter', () => {
    //
  });

  useEvent(el, 'mouseleave', () => {
    //
  });

  useMount(() => {
    glContext.addScene(mesh);

    return () => {
      glContext.removeScene(mesh);
    };
  });
};
