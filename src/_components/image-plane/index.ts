import {
  defineComponent,
  useIntersectionWatch,
  ref,
  useMount,
  useUnmount,
} from "lake";
import { Mesh, Plane, Program, Texture } from "ogl";
import { useScrollTween } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import fragment from "./frag.glsl";
import vertex from "./vert.glsl";
import type { GlobalContext } from "@/_foundation/type";

type Props = Pick<GlobalContext, "glContext">;

type Cache = {
  rect: DOMRect;
  currentY: number;
  ww: number;
  wh: number;
};

class ImagePlane {
  constructor(private mesh: Mesh) {}

  update = (update: Cache) => {
    const offset = update.rect.top;
    const moveY = -update.currentY + offset;

    this.mesh.scale.x = update.rect.width;
    this.mesh.scale.y = update.rect.height;

    const x = -update.ww * 0.5 + update.rect.width * 0.5 + update.rect.left;
    const y = update.wh * 0.5 - update.rect.height * 0.5 - moveY;

    this.mesh.position.set(x, y, this.mesh.position.z);
  };
}

export default defineComponent({
  name: "ImagePlane",
  setup(domImg: HTMLImageElement, { glContext }: Props) {
    const state = {
      resizing: false,
      visible: false,
    };

    const cache = ref<Cache>({
      currentY: 0,
      rect: domImg.getBoundingClientRect(),
      wh: window.innerHeight,
      ww: window.innerWidth,
    });

    const texture = new Texture(glContext.gl);

    domImg.crossOrigin = "anonymous";
    domImg.decode().then(() => {
      texture.image = domImg;
      uniforms.uImageAspect.value = domImg.naturalWidth / domImg.naturalHeight;

      plane.update(cache.value);
    });

    const uniforms = {
      uImageAspect: {
        value: 1,
      },
      uPlaneAspect: {
        value: cache.value.rect.width / cache.value.rect.height,
      },
      uTexture: {
        value: texture,
      },
    };

    const geo = new Plane(glContext.gl);

    const program = new Program(glContext.gl, {
      fragment,
      uniforms,
      vertex,
    });

    const mesh = new Mesh(glContext.gl, {
      geometry: geo,
      program,
    });

    const plane = new ImagePlane(mesh);

    useIntersectionWatch(
      domImg,
      ([entry]) => {
        state.visible = entry.isIntersecting;
      },
      {
        rootMargin: "25%",
      }
    );

    const [ww, wh] = useWindowSize(() => {
      state.resizing = true;

      cache.value = {
        ...cache.value,
        rect: domImg.getBoundingClientRect(),
        wh: wh.value,
        ww: ww.value,
      };
      plane.update(cache.value);

      state.resizing = false;
    });

    useScrollTween(({ y }) => {
      if (state.resizing || !state.visible) {
        return;
      }

      cache.value = {
        ...cache.value,
        currentY: y,
      };
      plane.update(cache.value);
    });

    useMount(() => {
      glContext.addScene(mesh);
    });

    useUnmount(() => {
      glContext.removeScene(mesh);
    });

    return {
      //
    };
  },
});
