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
  name: "project.underline",
  setup(el: HTMLImageElement, { glContext, env }: AppContext) {
    useIntersectionWatch(
      el,
      ([entry]) => {
        //
      },
      {
        rootMargin: "25%",
      }
    );

    useScrollTween(({ currentY, oldY }) => {
      //
    });

    useMount(() => {
      // glContext.addScene(mesh);
    });

    useUnmount(() => {
      // glContext.removeScene(mesh);
    });
  },
});

/*
var Be = new L.j(1,1,1,1)
, Te = new L.n({
  vertexShader: "\n  precision mediump float;\n\n  uniform float uVelo;\n\n  varying vec2 vUv;\n\n  void main(){\n    vec3 pos = position;\n\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);\n  }\n  ",
  fragmentShader: "\n  precision mediump float;\n\n  uniform vec3 uColor;\n\n  uniform float uProgress;\n  uniform float uVelo;\n  uniform float uBend;\n  \n  varying vec2 vUv;\n\n  vec4 a = vec4(0., 0., 0., 0);\n  vec4 b = vec4(uColor, 1.);\n  \n  void main() {\n    vec2 uv = vUv;\n\n    float t = step(uv.x, uProgress);\n    vec4 color = mix(a, b, t);\n    if(color.a < 0.0001) discard;\n    gl_FragColor = color;\n  }\n  "
})
, Ae = function(e) {
  function t() {
      var e, n, o, r;
      !function(e, t) {
          if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function")
      }(this, t);
      for (var u = arguments.length, a = new Array(u), s = 0; s < u; s++)
          a[s] = arguments[s];
      return o = this,
      r = (e = Se(t)).call.apply(e, [this].concat(a)),
      n = !r || "object" !== xe(r) && "function" != typeof r ? Oe(o) : r,
      _e(Oe(n), "onEnter", (function() {
          return i.a.to(n.material.uniforms.uProgress, {
              value: 1,
              ease: "expo",
              duration: 1
          })
      }
      )),
      _e(Oe(n), "onLeave", (function() {
          return i.a.to(n.material.uniforms.uProgress, {
              value: 0,
              ease: "expo",
              duration: 1
          })
      }
      )),
      n
  }
  var n, o, r;
  return function(e, t) {
      if ("function" != typeof t && null !== t)
          throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              writable: !0,
              configurable: !0
          }
      }),
      t && Pe(e, t)
  }(t, e),
  n = t,
  (o = [{
      key: "init",
      value: function(e) {
          je(Se(t.prototype), "init", this).call(this, e),
          this.geometry = Be,
          this.material = Te.clone(),
          this.material.uniforms = {
              uProgress: {
                  value: 0
              },
              uColor: {
                  value: new L.q(0,0,0)
              }
          },
          this.mesh = new L.f(this.geometry,this.material),
          this.add(this.mesh),
          this.mesh.renderOrder = 3,
          ze.planesGroup.add(this),
          ze.planes[this.name] = this,
          this.onAdd()
      }
  }, {
      key: "onAdd",
      value: function() {
          var e = this.material.uniforms.uColor;
          this.trigger = a('[data-gl-underline*="'.concat(this.name, '"]')),
          y.on("mouseenter", this.trigger, this.onEnter),
          y.on("mouseleave", this.trigger, this.onLeave),
          d.flags.black ? e.value = [0, 0, 0] : e.value = [1, 1, 1],
          d.flags.resized ? this.resize() : this.updateY(0)
      }
  }]) && ke(n.prototype, o),
  r && ke(n, r),
  t
}(J);
*/
