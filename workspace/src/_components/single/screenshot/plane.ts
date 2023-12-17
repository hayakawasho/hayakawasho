import { GlObject } from '@/_glsl/gl-object';
import { IMAGIX_API } from '@/_foundation/const';
import { map } from '@/_foundation/math';
import {
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
  #mq;

  public uniforms;

  constructor(
    el: HTMLElement,
    props: {
      currentY: number;
      ww: number;
      wh: number;
      mq: 'pc' | 'sp';
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

    this.uniforms = {
      u_depth: {
        value: {
          pc: 80,
          sp: 30,
        }[props.mq],
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

    const geo = new PlaneBufferGeometry(1, 1, 4, 20);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      uniforms: this.uniforms,
      vertexShader: vertex,
    });

    this.#mesh = new Mesh(geo, mat);
    this.add(this.#mesh);

    this.#mq = props.mq;
    this.resize(props.ww, props.wh);
    this.updateY(props.currentY);
  }

  resize = (ww: number, wh: number) => {
    const bounds = super.resize(ww, wh);

    const BOTTOM_MARGIN = {
      pc: wh * 0.25,
      sp: wh * 0.15,
    };

    const offset = -wh + bounds.top;
    this.#offsetY = offset;
    this.#endY = offset + bounds.height + BOTTOM_MARGIN[this.#mq];

    this.#mesh.scale.set(bounds.width, bounds.height, 1);

    return bounds;
  };

  updateY = (current: number) => {
    super.updateY(current);

    const progress = map(current, this.#offsetY, this.#endY, 0, 1.5);
    this.uniforms.u_progress.value = progress;
  };
}
