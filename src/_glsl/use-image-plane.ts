import { useIntersectionWatch, ref, useMount, useUnmount } from "lake";
import { Mesh, Plane, Program, Texture, Vec2 } from "ogl";
import { useWindowSize } from "@/_states/window-size";
import { noop } from "@/_foundation/utils";
import type { GlobalContext } from "@/_foundation/type";

type Cache = {
  rect: DOMRect;
  currentY: number;
  ww: number;
  wh: number;
};

type Props = {
  el: HTMLImageElement;
  fragment: string;
  vertex: string;
  uniforms: Record<
    string,
    {
      value: unknown;
    }
  >;
} & Pick<GlobalContext, "glContext">;

export const useImagePlane = ({ el, glContext, ...props }: Props) => {
  const { gl, addScene, removeScene } = glContext;

  const state = {
    resizing: false,
    visible: false,
  };

  const [ww, wh] = useWindowSize(noop);

  const cache = ref<Cache>({
    currentY: 0,
    rect: el.getBoundingClientRect(),
    wh: wh.value,
    ww: ww.value,
  });

  const texture = new Texture(gl);
  el.crossOrigin = "anonymous";

  el.decode().then(() => {
    texture.image = el;

    uniforms.uImageSize.value.set(
      cache.value.rect.width,
      cache.value.rect.height
    );

    plane.update(cache.value);
  });

  const uniforms = {
    ...props.uniforms,
    uTexture: {
      value: texture,
    },
    uMeshSize: {
      value: new Vec2(ww.value, wh.value),
    },
    uImageSize: {
      value: new Vec2(0, 0),
    },
  };

  const geometry = new Plane(gl);

  const program = new Program(gl, {
    fragment: props.fragment,
    uniforms,
    vertex: props.vertex,
  });

  const mesh = new Mesh(gl, {
    geometry,
    program,
  });

  const plane = new ImagePlane(mesh);

  useIntersectionWatch(
    el,
    ([entry]) => {
      state.visible = entry.isIntersecting;
    },
    {
      rootMargin: "25%",
    }
  );

  useWindowSize(() => {
    state.resizing = true;

    cache.value = {
      ...cache.value,
      rect: el.getBoundingClientRect(),
      wh: wh.value,
      ww: ww.value,
    };
    plane.update(cache.value);

    state.resizing = false;
  });

  useMount(() => {
    addScene(mesh);
  });

  useUnmount(() => {
    removeScene(mesh);
  });

  return {
    plane,
    state,
    cache,
  };
};

class ImagePlane {
  constructor(private mesh: Mesh) {}

  update = (update: Cache) => {
    const offset = update.rect.top;
    const moveY = -update.currentY + offset;

    this.mesh.scale.x = update.rect.width;
    this.mesh.scale.y = update.rect.height;

    const x = -update.ww / 2 + update.rect.width / 2 + update.rect.left;
    const y = update.wh / 2 - update.rect.height / 2 - moveY;

    this.mesh.position.set(x, y, this.mesh.position.z);
  };
}
