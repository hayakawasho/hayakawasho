import { IMAGIX_API } from '@/_foundation/const';
import { map } from '@/_foundation/math';
import {
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
} from '@/_foundation/three';
import { GlObject } from '@/_glsl/gl-object';
import type { Size } from '@/_foundation/type';

const loader = new TextureLoader();
loader.crossOrigin = 'anonymous';

export class Plane extends GlObject {
  #offsetY = 0;
  #endY = 0;
  #mesh;
  #mq;
  uniforms;

  constructor(
    el: HTMLElement,
    props: {
      currentY: number;
      mq: 'pc' | 'sp';
      windowSize: Size;
      geo: PlaneBufferGeometry;
      mat: ShaderMaterial;
    }
  ) {
    super(el);

    const imgSrc = el.dataset.src!;
    const texSrc = {
      pc: imgSrc + IMAGIX_API + '&w=1200',
      sp: imgSrc + IMAGIX_API + '&w=750',
    };

    const texture = loader.load(texSrc[props.mq], texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    const depth = {
      pc: 60,
      sp: 32,
    };

    this.uniforms = {
      u_depth: {
        value: depth[props.mq],
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

    this.#mesh = new Mesh(props.geo, mat);
    this.add(this.#mesh);

    this.#mq = props.mq;

    this.resize(props.windowSize);
    this.updateY(props.currentY);
  }

  resize = (size: Size) => {
    const bounds = super.resize(size);

    const bottomMargin = {
      pc: size.height * 0.25,
      sp: size.height * 0.15,
    };

    const offset = -size.height + bounds.top;
    this.#offsetY = offset;
    this.#endY = offset + bounds.height + bottomMargin[this.#mq];

    this.#mesh.scale.set(bounds.width, bounds.height, 1);

    return bounds;
  };

  updateY = (current: number) => {
    super.updateY(current);

    this.uniforms.u_progress.value = map(current, this.#offsetY, this.#endY, 0, 1.5);
  };
}
