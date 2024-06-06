import { IMG_API } from "~/_foundation/const";
import { map } from "~/_foundation/math";
import { GlObject } from "~/_gl/object";
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from "~/_gl/three";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";

export class Plane extends GlObject {
  #offsetY = 0;
  #endY = 0;
  #mesh;
  uniforms;

  constructor(
    el: HTMLElement,
    {
      currentY,
      device,
      windowWidth,
      windowHeight,
    }: {
      currentY: number;
      windowWidth: number;
      windowHeight: number;
      device: "pc" | "sp";
    },
  ) {
    super(el);

    const imgSrc = el.dataset.src!;
    const texSrc = {
      pc: imgSrc + IMG_API + "&w=1440",
      sp: imgSrc + IMG_API + "&w=750",
    };

    const loader = new TextureLoader();
    loader.crossOrigin = "anonymous";

    const texture = loader.load(texSrc[device], texture => {
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

    this.resize({
      height: windowHeight,
      width: windowWidth,
      y: currentY,
    });
  }

  resize = (newValues: Parameters<GlObject["resize"]>[0]) => {
    super.resize(newValues);

    const offset = -newValues.height + this.cache.top + this.cache.y;
    this.#offsetY = offset;
    this.#endY = offset + newValues.height + this.cache.height;

    this.#mesh.scale.set(this.cache.width, this.cache.height, 1);
  };

  updateY = (current: number) => {
    super.update({ y: current });

    this.uniforms.u_innerY.value = map(current, this.#offsetY, this.#endY, -0.1, 0.1);
    this.uniforms.u_scale.value = map(current, this.#offsetY, this.#endY, 1.2, 1);
  };
}
