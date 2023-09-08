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
};

export default defineComponent({
  name: "project.next",
  setup(el: HTMLImageElement, { glContext, env }: AppContext) {
    const [ww, wh] = useWindowSize();

    const cache = ref<Cache>({
      currentY: 0,
      rect: el.getBoundingClientRect(),
    });

    const state = {
      resizing: false,
      visible: false,
    };

    const texture = new Texture(glContext.gl);

    const src = {
      pc: el.dataset.src!,
      sp: el.dataset.srcSp!,
    };

    loadImage(src[env.mq], ({ img }) => {
      texture.image = img;
      uniforms.u_image_size.value.set(img.naturalWidth, img.naturalHeight);

      imgPlane.resize(ww.value, wh.value);
      imgPlane.updatePos(cache.value.currentY);
    });

    const uniforms = {
      u_image_size: {
        value: new Vec2(0, 0),
      },
      u_mesh_size: {
        value: new Vec2(cache.value.rect.width, cache.value.rect.height),
      },
      u_texture: {
        value: texture,
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
      if (state.resizing || !state.visible || currentY === oldY) {
        return;
      }
      imgPlane.updatePos(currentY);
    });

    useMount(() => {
      glContext.addScene(mesh);
    });

    useUnmount(() => {
      glContext.removeScene(mesh);
    });
  },
});

/*
, function() {
  var t = Math.floor;
  window.styleWords = {
      body: {
          el: null
      },
      onSplit(t) {
          this.body.el = t || document.querySelector(".page-origin"),
          this.$line = this.body.el.querySelectorAll(".js-split-l");
          for (var e = 0; e < this.$line.length; e++)
              "any" === this.$line[e].dataset.disable && __DETECT__.device.any || this.onSplitLines(this.$line[e]);
          this.$word = this.body.el.querySelectorAll(".js-split-w");
          for (e = 0; e < this.$word.length; e++) {
              var i = this.$word[e].dataset.type;
              "any" === this.$word[e].dataset.disable && __DETECT__.device.any || this.onSplitWords(this.$word[e], i)
          }
          this.$word_child = this.body.el.querySelectorAll(".js-split-w-child"),
          this.$word_child.forEach((t=>{
              if (t.hasChildNodes()) {
                  var e = t.childNodes
                    , i = t.dataset.type;
                  e.forEach((t=>{
                      this.onSplitWords(t, i)
                  }
                  ))
              }
          }
          )),
          this.addEvents(),
          this.onResize()
      },
      onSplitLines(t) {
          for (var e, i = t.dataset.type, n = t.querySelectorAll(".l"), s = 0; s < n.length; s++)
              (e = n[s]).dataset.y = s,
              s === n.length - 1 && e.classList.add("last"),
              this.onSplitWords(e, i)
      },
      onSplitWords(t, e) {
          var i = ""
            , n = t.innerText.split(" ");
          if ("char" === e)
              for (var s = 0; s < n.length; s++) {
                  for (var r = "", o = n[s].split(""), a = 0; a < o.length; a++)
                      r += '<div class="c o" data-c="' + o[a] + '"><div class="t">' + o[a] + "</div></div>";
                  i += 0 == s ? '<div class="w" data-w="' + n[s] + '">' + r + "</div>" : '<div class="s"> </div><div class="w" data-w="' + n[s] + '">' + r + "</div>"
              }
          else
              for (s = 0; s < n.length; s++)
                  i += 0 == s ? '<div class="w" data-w="' + n[s] + '"><div class="o"><div class="t">' + n[s] + "</div></div></div>" : '<div class="s"> </div><div class="w" data-w="' + n[s] + '"><div class="o"><div class="t">' + n[s] + "</div></div></div>";
          t.innerHTML = i
      },
      events: [],
      addEvents() {
          this.events = [],
          this.$line.forEach((t=>{
              t.querySelectorAll(".l").forEach((t=>{
                  var e = t.querySelector(".w:last-child .c:last-child");
                  if (null === e && (e = t.querySelector(".w:last-child .t")),
                  e) {
                      const n = function() {
                          t.dataset.anim = 1
                      }
                        , s = function() {
                          t.dataset.anim = 0
                      };
                      e.addEventListener("transitionstart", n),
                      e.addEventListener("transitionend", s);
                      var i = {
                          el: e,
                          start: {
                              func: n
                          },
                          end: {
                              func: s
                          }
                      };
                      this.events.push(i)
                  }
              }
              ))
          }
          ))
      },
      removeEvents() {
          for (var t, e = 0; e < this.events.length; e++)
              (t = this.events[e]).el.removeEventListener("transitionstart", t.start.func),
              t.el.removeEventListener("transitionend", t.end.func);
          this.events = []
      },
      onReset() {
          this.removeEvents()
      },
      onResize() {
          for (var e = this.body.el.querySelectorAll(".js-split-w, .js-split-w-child"), i = 0; i < e.length; i++)
              for (var n = e[i].querySelectorAll(".w,.s"), s = e[i].getBoundingClientRect(), r = 0; r < n.length; r++) {
                  var o = (u = n[r].getBoundingClientRect()).top - s.top
                    , a = u.left - s.left
                    , l = t(a / u.width)
                    , h = t(o / u.height);
                  n[r].classList.contains("s") ? n[r].dataset.x = Math.min(l, 1) : (n[r].dataset.x = l,
                  n[r].dataset.y = h)
              }
          if (__DETECT__.device.any) {
              var c = this.body.el.querySelectorAll(".js-split-l");
              for (i = 0; i < c.length; i++)
                  for (s = c[i].getBoundingClientRect(),
                  n = c[i].querySelectorAll(".w,.s"),
                  r = 0; r < n.length; r++) {
                      var u;
                      o = (u = n[r].getBoundingClientRect()).top - s.top,
                      h = t(o / u.height);
                      n[r].classList.contains("s") || (n[r].dataset.y = h)
                  }
          }
      }
  }
}
*/
