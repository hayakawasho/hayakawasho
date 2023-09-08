import {
  defineComponent,
  useMount,
  useUnmount,
  ref,
  useIntersectionWatch,
} from "lake";
import { Texture, Vec2, Mesh, Program, Plane } from "ogl";
// import { Tween } from "@/_foundation/tween";
import { loadImage } from "@/_foundation/utils";
import { ImgPlane } from "@/_glsl";
import { useScrollTween } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { AppContext } from "@/_foundation/type";

type Cache = {
  rect: DOMRect;
  currentY: number;
  ww: number;
  wh: number;
};

export default defineComponent({
  name: "home.index",
  setup(
    el: HTMLImageElement,
    { glContext, env }: Pick<AppContext, "glContext" | "env">
  ) {
    const [ww, wh] = useWindowSize();

    const cache = ref<Cache>({
      currentY: 0,
      rect: el.getBoundingClientRect(),
      wh: wh.value,
      ww: ww.value,
    });

    const state = {
      resizing: false,
      visible: false,
      ty: 0,
      cy: 0,
      diff: 0,
      dragging: false,
      max: {
        y: 0,
      },
    };

    const src = {
      pc: el.dataset.src!,
      sp: el.dataset.srcSp!,
    };

    const texture = new Texture(glContext.gl);

    const uniforms = {
      u_alpha: {
        value: 1.0,
      },
      u_image_size: {
        value: new Vec2(0, 0),
      },
      u_mesh_size: {
        value: new Vec2(cache.value.rect.width, cache.value.rect.height),
      },
      u_scale: {
        value: 1.0,
      },
      u_texture: {
        value: texture,
      },
      u_time: {
        value: 0,
      },
      u_velo: {
        value: 0,
      },
      u_diff: {
        value: 0,
      },
    };

    const geometry = new Plane(glContext.gl);
    const program = new Program(glContext.gl, {
      fragment,
      uniforms,
      vertex,
    });

    const mesh = new Mesh(glContext.gl, {
      geometry,
      program,
    });

    const imgPlane = new ImgPlane(mesh, el);

    texture.image = loadImage(src[env.mq], () => {
      const { naturalWidth, naturalHeight } = texture.image as HTMLImageElement;
      uniforms.u_image_size.value.set(naturalWidth, naturalHeight);

      // imgPlane.updatePos();
    });

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

      imgPlane.resize(ww.value, wh.value);

      state.resizing = false;
    });

    useScrollTween(({ currentY, oldY }) => {
      const diff = currentY - oldY;

      // imgPlane.updatePos();
    });

    useMount(() => {
      glContext.addScene(mesh);
    });

    useUnmount(() => {
      glContext.removeScene(mesh);
    });
  },
});

/**
 *
 *
console.clear()

let ww = window.innerWidth
let wh = window.innerHeight

const isFirefox = navigator.userAgent.indexOf('Firefox') > -1
const isWindows = navigator.appVersion.indexOf("Win") != -1

const mouseMultiplier = .6
const firefoxMultiplier = 20

const multipliers = {
	mouse: isWindows ? mouseMultiplier * 2 : mouseMultiplier,
	firefox: isWindows ? firefoxMultiplier * 2 : firefoxMultiplier
}

class Core {

	constructor() {
		this.tx = 0
		this.ty = 0
		this.cx = 0
		this.cy = 0

		this.diff = 0

		this.wheel = { x: 0, y: 0 }
		this.on = { x: 0, y: 0 }
		this.max = { x: 0, y: 0 }

		this.isDragging = false

		this.tl = gsap.timeline({ paused: true })

		this.el = document.querySelector('.js-grid')

		// GL specifics
		this.scene = new THREE.Scene()

		this.camera = new THREE.OrthographicCamera(
			ww / -2, ww / 2, wh / 2, wh / -2, 1, 1000
		)
		this.camera.lookAt(this.scene.position)
		this.camera.position.z = 1


		this.addPlanes()
		this.addEvents()
		this.resize()
	}


	tick = () => {
		const xDiff = this.tx - this.cx
		const yDiff = this.ty - this.cy

		this.cx += xDiff * 0.085
		this.cx = Math.round(this.cx * 100) / 100

		this.cy += yDiff * 0.085
		this.cy = Math.round(this.cy * 100) / 100

		this.diff = Math.max(
			Math.abs(yDiff * 0.0001),
			Math.abs(xDiff * 0.0001)
		)

		this.planes.length
			&& this.planes.forEach(plane =>
				plane.update(this.cx, this.cy, this.max, this.diff))

		this.renderer.render(this.scene, this.camera)
	}

	onWheel = (e) => {
		const { mouse, firefox } = multipliers

        this.wheel.x = e.wheelDeltaX || e.deltaX * -1
		this.wheel.y = e.wheelDeltaY || e.deltaY * -1

        if (isFirefox && e.deltaMode === 1) {
            this.wheel.x *= firefox
			this.wheel.y *= firefox
        }

        this.wheel.y *= mouse
		this.wheel.x *= mouse

		this.tx += this.wheel.x
		this.ty -= this.wheel.y
	}

	resize = () => {
		ww = window.innerHeight
		wh = window.innerWidth

		const { bottom, right } = this.el.getBoundingClientRect()

		this.max.x = right
		this.max.y = bottom
	}
}

const loader = new THREE.TextureLoader()


new Core()

*/
