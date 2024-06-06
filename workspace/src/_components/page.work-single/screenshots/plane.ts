import { IMG_API } from "~/_foundation/const";
import { map } from "~/_foundation/math";
import { GlObject } from "~/_gl/object";
import {
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from "~/_gl/three";

export class Plane extends GlObject {
  #offsetY = 0;
  #endY = 0;
  #mesh;
  #device;
  uniforms;

  constructor(
    el: HTMLElement,
    {
      currentY,
      device,
      geo,
      windowWidth,
      windowHeight,
      ...props
    }: {
      currentY: number;
      device: "pc" | "sp";
      windowWidth: number;
      windowHeight: number;
      geo: PlaneBufferGeometry;
      mat: ShaderMaterial;
    },
  ) {
    super(el);

    const imgSrc = el.dataset.src!;
    const texSrc = {
      pc: imgSrc + IMG_API + "&w=14000",
      sp: imgSrc + IMG_API + "&w=750",
    };

    const loader = new TextureLoader();
    loader.crossOrigin = "anonymous";

    const texture = loader.load(texSrc[device], texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    this.uniforms = {
      u_bend: {
        value: {
          pc: 1.25,
          sp: 0.7,
        }[device],
      },
      u_depth: {
        value: {
          pc: 90,
          sp: 45,
        }[device],
      },
      u_opacity: {
        value: 1,
      },
      u_progress: {
        value: 0,
      },
      u_texture: {
        value: texture,
      },
    };

    const mat = props.mat.clone() as ShaderMaterial;
    mat.uniforms = this.uniforms;

    this.#mesh = new Mesh(geo, mat);
    this.add(this.#mesh);

    this.#device = device;

    this.resize({
      height: windowHeight,
      width: windowWidth,
      y: currentY,
    });
  }

  resize = (newValues: Parameters<GlObject["resize"]>[0]) => {
    super.resize(newValues);

    const bottomMargin = {
      pc: newValues.height * 0.175,
      sp: newValues.height * 0.1,
    };

    const offset = -newValues.height + this.cache.top + this.cache.y;
    this.#offsetY = offset;
    this.#endY = offset + this.cache.height + bottomMargin[this.#device];

    this.#mesh.scale.set(this.cache.width, this.cache.height, 1);
  };

  updateY = (current: number) => {
    super.update({ y: current });

    this.uniforms.u_progress.value = map(current, this.#offsetY, this.#endY, 0, 1.5);
  };
}
