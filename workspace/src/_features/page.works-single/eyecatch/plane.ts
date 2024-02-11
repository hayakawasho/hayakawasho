import { IMAGIX_API } from "@/_foundation/const";
import { GlObject } from "@/_foundation/glsl/gl-object";
import { map } from "@/_foundation/math";
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from "@/_foundation/three";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { Size } from "@/_foundation/type";

const loader = new TextureLoader();
loader.crossOrigin = "anonymous";

export class Plane extends GlObject {
  #offsetY = 0;
  #endY = 0;
  #mesh;
  uniforms;

  constructor(
    el: HTMLElement,
    props: {
      currentY: number;
      windowSize: Size;
    },
  ) {
    super(el);

    const texSrc = el.dataset.src! + IMAGIX_API + "&w=750";

    const texture = loader.load(texSrc, texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    this.uniforms = {
      u_innerX: {
        value: 0,
      },
      u_innerY: {
        value: 0,
      },
      u_opacity: {
        value: 1,
      },
      u_scale: {
        value: 0,
      },
      u_screenCenterTexture: {
        value: 0,
      },
      u_size: {
        value: new Vector2(1, 1),
      },
      u_texture: {
        value: texture,
      },
    };

    const geo = new PlaneBufferGeometry(1, 1, 1, 1);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      uniforms: this.uniforms,
      vertexShader: vertex,
    });

    this.#mesh = new Mesh(geo, mat);
    this.add(this.#mesh);

    this.resize(props.windowSize);
    this.updateY(props.currentY);
  }

  resize = (size: Size) => {
    const bounds = super.resize(size);

    const offset = -size.height + bounds.top;
    this.#offsetY = offset;
    this.#endY = offset + size.height + bounds.height;

    this.#mesh.scale.set(bounds.width, bounds.height, 1);

    return bounds;
  };

  updateY = (current: number) => {
    super.updateY(current);

    this.uniforms.u_innerY.value = map(current, this.#offsetY, this.#endY, -0.2, 0.1);
    this.uniforms.u_scale.value = map(current, this.#offsetY, this.#endY, 1.2, 1);
  };
}
