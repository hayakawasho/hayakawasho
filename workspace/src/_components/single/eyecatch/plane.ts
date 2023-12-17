import { GlObject } from '@/_glsl/gl-object';
import { IMAGIX_API } from '@/_foundation/const';
import { map } from '@/_foundation/math';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from '@/_foundation/three';
import fragment from './fragment.frag';
import vertex from './vertex.vert';

const loader = new TextureLoader();
loader.crossOrigin = 'anonymous';

export class Plane extends GlObject {
  #offsetY = 0;
  #endY = 0;
  #mesh;
  uniforms;

  constructor(
    el: HTMLElement,
    props: {
      currentY: number;
      ww: number;
      wh: number;
    }
  ) {
    super(el);

    const imgSrc = el.dataset.src! + IMAGIX_API + '&w=750';

    const texture = loader.load(imgSrc, texture => {
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

    this.resize(props.ww, props.wh);
    this.updateY(props.currentY);
  }

  resize = (ww: number, wh: number) => {
    const bounds = super.resize(ww, wh);

    const offset = -wh + bounds.top;
    this.#offsetY = offset;
    this.#endY = offset + wh + bounds.height;

    this.#mesh.scale.set(bounds.width, bounds.height, 1);

    return bounds;
  };

  updateY = (current: number) => {
    super.updateY(current);

    this.uniforms.u_innerY.value = map(current, this.#offsetY, this.#endY, -0.2, 0.1);
    this.uniforms.u_scale.value = map(current, this.#offsetY, this.#endY, 1.2, 1);
  };
}
