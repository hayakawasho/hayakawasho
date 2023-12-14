import { gsap } from 'gsap';
import { defineComponent, useMount, useUnmount, useIntersectionWatch, useDomRef } from 'lake';
import { Texture, Vec2, Mesh, Program, Plane } from 'ogl';
import { useTick } from '@/_foundation/hooks';
// import { Tween } from "@/_foundation/tween";
import { loadImage } from '@/_foundation/utils';
import { useWindowSize } from '@/_states/window-size';
import fragment from './fragment.frag';
import vertex from './vertex.vert';
import type { AppContext } from '@/_foundation/type';
import type { ReadonlyRef } from 'lake';

type Props = AppContext;

export default defineComponent({
  name: 'Thumbnail',
  setup(el: HTMLElement, context: Props) {
    const onMouseEnter = (e: MouseEvent) => {
      //
    };

    const onMounseLeave = (e: MouseEvent) => {
      //
    };

    return {
      onMounseLeave,
      onMouseEnter,
    };
  },
});

/*

    webGL.features = {
        fov: 15,
        ready: !1,
        planes: [],
        once() {
            this.width = __WW__,
            this.height = __WH__,
            this.target = new OGL.RenderTarget(webGL.gl,{
                width: this.width * __RES__,
                height: this.height * __RES__
            }),
            this.stage = new OGL.Transform,
            this.ready = !0;

            for (var t = 0; t < THUMB.length; t++)
                this.planes.push({
                    mesh: null,
                    geometry: null,
                    program: null,
                    texture: {
                        timer: null,
                        start: !1,
                        loaded: !1,
                        video: THUMB[t].video,
                        image: THUMB[t].image,
                        type: THUMB[t].media,
                        tex: null,
                        el: null
                    },
                    ratio: {
                        w: +THUMB[t].ratio.w,
                        h: +THUMB[t].ratio.h
                    },
                    type: THUMB[t].type,
                    postId: THUMB[t].post_id,
                    param: {
                        scale: 1.1,
                        zoom: .5,
                        power: 1
                    },
                    isopend: !1,
                    tl: {
                        enter: [],
                        leave: []
                    },
                    visible: 0,
                    slide: {
                        visibility: [],
                        x: 0,
                        y: 0,
                        scale: 1,
                        offset: {
                            x: 0,
                            y: 0
                        },
                        padding: {
                            x: 0,
                            y: 0
                        },
                        rect: {
                            top: 0,
                            left: 0,
                            width: 0,
                            height: 0
                        }
                    },
                    uniforms: {
                        scale: {
                            x: 2,
                            y: 2
                        },
                        clipTop: {
                            x: 0,
                            y: 1
                        },
                        clipBottom: {
                            x: 0,
                            y: 0
                        }
                    }
                });
            this.planes.forEach(((t,e)=>{
                if ("video" === t.texture.type) {
                    t.texture.tex = new OGL.Texture(webGL.gl,{
                        generateMipmaps: !1,
                        width: t.ratio.w,
                        height: t.ratio.h
                    });
                    var i = __DETECT__.device.any ? LOAD_FEATURES + LOAD_FEATURES * (e + 1) : .5 * LOAD_FEATURES + LOAD_FEATURES * (e + 1);
                    t.texture.timer = setTimeout((function() {
                        t.texture.start = !0,
                        t.texture.el = document.createElement("video"),
                        t.texture.el.src = t.texture.video.src,
                        t.texture.el.loop = !0,
                        t.texture.el.muted = !0,
                        t.texture.el.setAttribute("crossorigin", "anonymous"),
                        t.texture.el.setAttribute("webkit-playsinline", !0),
                        t.texture.el.setAttribute("playsinline", !0),
                        t.texture.el.setAttribute("preload", "metadata"),
                        t.texture.loaded = !0
                    }
                    ), i)
                } else {
                    t.texture.tex = new OGL.Texture(webGL.gl,{
                        generateMipmaps: !1
                    });
                    i = __DETECT__.device.any ? LOAD_FEATURES + LOAD_FEATURES * (e + 1) : .5 * LOAD_FEATURES + LOAD_FEATURES * (e + 1);
                    t.texture.timer = setTimeout((function() {
                        t.texture.start = !0;
                        var e = getImageSrc(t.texture.image.d1x, t.texture.image.d2x, t.texture.image.mob, !0);
                        t.texture.el = new Image,
                        t.texture.el.crossOrigin = "Anonymous",
                        t.texture.el.onload = function() {
                            t.texture.tex.image = t.texture.el,
                            t.texture.loaded = !0
                        }
                        ,
                        t.texture.el.src = e
                    }
                    ), i)
                }
                t.geometry = new OGL.Plane(webGL.gl, {
                    width: 1,
                    height: 1
                }),
                t.program = new OGL.Program(webGL.gl,{
                    vertex: "\n\t\t\t\t\tattribute vec2 uv;\n\t\t\t\t\tattribute vec3 position;\n\t\t\t\t\tuniform mat4 modelViewMatrix;\n\t\t\t\t\tuniform mat4 projectionMatrix;\n\t\t\t\t\tvarying vec2 vUv;\n\t\t\t\t\tvoid main() {\n\t\t\t\t\t\tvUv = uv;\n\t\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n\t\t\t\t\t}\n\t\t\t\t",
                    fragment: "\nprecision highp float;\nuniform sampler2D tDiffuse;\nuniform float alpha;\nuniform vec2 resolution;\nuniform vec2 iResolution;\nuniform vec2 scale;\nuniform vec2 offset;\nuniform vec2 clipTop;\nuniform vec2 clipBottom;\nvarying vec2 vUv;\nconst float torn = 0.05;\nvoid main() {\n\n\t//\n\tvec2 ratio = vec2(\n\t\tmin( (resolution.x / resolution.y) / ( iResolution.x / iResolution.y), 1.0),\n\t\tmin( (resolution.y / resolution.x) / ( iResolution.y / iResolution.x), 1.0)\n\t);\n\n\t//\n\tvec2 uv_cover = vec2(\n\t\tvUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n\t\tvUv.y * ratio.y + (1.0 - ratio.y) * 0.5\n\t);\n\n\t//\n\tvec2 resize = 1.0/scale;\n\tvec2 scaleOffset = resize * (scale - 1.0) * 0.5;\n\tvec2 uv_scale = uv_cover * resize + scaleOffset + offset;\n\n\t//\n\tvec2 uv_repeat = vec2( uv_scale.x, uv_scale.y );\n\tif( uv_repeat.x > 1.0 ) { uv_repeat.x = 2.0 - uv_repeat.x; }\n\tif( uv_repeat.x < 0.0 ) { uv_repeat.x = -1.0 * uv_repeat.x; }\n\tif( uv_repeat.y > 1.0 ) { uv_repeat.y = 2.0 - uv_repeat.y; }\n\tif( uv_repeat.y < 0.0 ) { uv_repeat.y = -1.0 * uv_repeat.y; }\n\n\t//\n\tvec4 tex = texture2D( tDiffuse, uv_repeat );\n\tif( 1.0 - clipTop.y < vUv.y && clipBottom.y > vUv.y ){\n\t\tgl_FragColor = tex;\n\t}\n\n}",
                    cullFace: null,
                    transparent: !0,
                    depthWrite: !1,
                    depthTest: !0,
                    uniforms: {
                        tDiffuse: {
                            value: t.texture.tex
                        },
                        resolution: {
                            value: new OGL.Vec2(__WW__,__WH__)
                        },
                        iResolution: {
                            value: new OGL.Vec2(__WW__,__WH__)
                        },
                        clipTop: {
                            value: new OGL.Vec2(0,1)
                        },
                        clipBottom: {
                            value: new OGL.Vec2(0,1)
                        },
                        scale: {
                            value: new OGL.Vec2(1,1)
                        },
                        offset: {
                            value: new OGL.Vec2(0,0)
                        },
                        alpha: {
                            value: 1
                        }
                    }
                }),
                t.mesh = new OGL.Mesh(webGL.gl,{
                    geometry: t.geometry,
                    program: t.program
                }),
                t.mesh.setParent(this.stage)
            }
            ))
        },
        onDestroy() {
            this.stage = null
        },
        onDestroyMesh(t) {
            t.geometry = null,
            t.program = null,
            t = null
        },
        body: {
            el: null
        },
        onInit(t) {
            this.body.el = t || document.querySelector(".page-origin"),
            "home" === pageTransition.name ? this.planes.forEach((t=>{
                this.onKillTweens(t.postId),
                this.setLeaveById()
            }
            )) : "archive-project" === pageTransition.name ? this.planes.forEach(((t,e)=>{
                t.isopend ? "project" != t.type && this.setLeaveById() : "project" === t.type ? (this.onKillTweens(t.postId),
                this.onEnterById(t.postId, !0, .1 * e, 1)) : this.onLeaveById(t.postId, !0)
            }
            )) : this.planes.forEach((()=>{
                this.setLeaveById()
            }
            ))
        },
        enter(t) {
            if (__DETECT__.device.any)
                return !1;
            var e = webGL.features
              , i = t.target.dataset.thumbId;
            $html.dataset.cursorType = t.target.dataset.c,
            i && (e.onKillTweens(i),
            e.onEnterById(i, !1))
        },
        onKillTweens(t) {
            this.planes.forEach((e=>{
                if (t === e.postId) {
                    for (var i = 0; i < e.tl.enter.length; i++)
                        e.tl.enter[i] && e.tl.enter[i].kill();
                    e.tl.enter = [];
                    for (i = 0; i < e.tl.leave.length; i++)
                        e.tl.leave[i] && e.tl.leave[i].kill();
                    e.tl.leave = []
                }
            }
            ))
        },
        onEnterById(t, e=!1, i=0, n=.8, s="power2.out") {
            this.planes.forEach((e=>{
                var r;
                t === e.postId && (e.isopend = !0,
                e.visible = 1,
                (r = gsap.timeline()).set(e.uniforms.scale, {
                    x: 1.6,
                    y: 1.6
                }),
                r.to(e.uniforms.scale, {
                    x: 1.2,
                    y: 1.2,
                    duration: 2 * n,
                    ease: s,
                    delay: i
                }),
                e.tl.enter.push(r),
                (r = gsap.timeline()).set(e.uniforms.clipTop, {
                    y: 1
                }),
                r.set(e.uniforms.clipBottom, {
                    y: 0
                }),
                r.to(e.uniforms.clipBottom, {
                    y: 1,
                    duration: n,
                    ease: s,
                    delay: i
                }),
                e.tl.enter.push(r))
            }
            ))
        },
        leave(t) {
            if (__DETECT__.device.any)
                return !1;
            var e = webGL.features
              , i = t.target.dataset.thumbId;
            $html.dataset.cursorType = "none",
            i && e.onLeaveById(i, !1)
        },
        onLeaveById(t, e=!1, i=0, n=1, s="power2.out") {
            this.planes.forEach((e=>{
                var r;
                t === e.postId && (e.isopend = !1,
                (r = gsap.timeline()).to(e.uniforms.scale, {
                    x: .9,
                    y: .9,
                    duration: n,
                    ease: s,
                    delay: i,
                    onComplete() {
                        e.visible = 0
                    }
                }),
                e.tl.leave.push(r),
                (r = gsap.timeline()).set(e.uniforms.clipTop, {
                    y: 1
                }),
                r.to(e.uniforms.clipTop, {
                    y: 0,
                    duration: n,
                    ease: s,
                    delay: i
                }),
                e.tl.leave.push(r))
            }
            ))
        },
        setLeaveById() {
            this.planes.forEach((t=>{
                var e;
                t.isopend = !1,
                (e = gsap.timeline()).set(t.uniforms.scale, {
                    x: .9,
                    y: .9
                }),
                t.tl.leave.push(e),
                (e = gsap.timeline()).set(t.uniforms.clipTop, {
                    y: 0
                }),
                t.tl.leave.push(e),
                t.visible = 0
            }
            ))
        },
        onSlideScroll(t) {
            for (var e, i = this.planes.length - 1; 0 <= i; i--)
                e = this.planes[i],
                t.postId === e.postId && (e.slide.x = t.anim.mesh.x,
                e.slide.offset = t.anim.offset,
                e.slide.scale = t.anim.scale,
                e.slide.rect = t.inside.rect,
                e.slide.padding = t.inside.padding)
        },
        onSlideScrollHandleVisibility(t) {
            for (var e = this.planes.length - 1; 0 <= e; e--)
                (n = this.planes[e]).slide.visibility = [];
            for (e = this.planes.length - 1; 0 <= e; e--) {
                n = this.planes[e];
                for (var i = 0; i < t.scroll.sections.elems.length; i++) {
                    const e = t.scroll.sections.elems[i];
                    e.postId === n.postId && n.slide.visibility.push(e.visible)
                }
            }
            for (e = this.planes.length - 1; 0 <= e; e--) {
                var n = this.planes[e]
                  , s = 0;
                for (i = 0; i < n.slide.visibility.length; i++)
                    n.slide.visibility[i] && s++;
                n.visible = s
            }
        },
        onUpdate() {
            this.planes.forEach((t=>{
                if (t.visible) {
                    if (t.mesh.visible = !0,
                    !t.texture.start)
                        if (t.texture.start = !0,
                        clearTimeout(t.texture.timer),
                        "video" === t.texture.type)
                            t.texture.el = document.createElement("video"),
                            t.texture.el.src = t.texture.video.src,
                            t.texture.el.loop = !0,
                            t.texture.el.muted = !0,
                            t.texture.el.setAttribute("crossorigin", "anonymous"),
                            t.texture.el.setAttribute("webkit-playsinline", !0),
                            t.texture.el.setAttribute("playsinline", !0),
                            t.texture.el.setAttribute("preload", "metadata"),
                            t.texture.loaded = !0;
                        else {
                            var e = getImageSrc(t.texture.image.d1x, t.texture.image.d2x, t.texture.image.mob, !0);
                            t.texture.el = new Image,
                            t.texture.el.crossOrigin = "Anonymous",
                            t.texture.el.onload = function() {
                                t.texture.tex.image = t.texture.el,
                                t.texture.loaded = !0
                            }
                            ,
                            t.texture.el.src = e
                        }
                } else
                    t.mesh.visible = !1
            }
            ));
            for (var t, e = 0, i = 0; i < this.planes.length; i++) {
                (t = this.planes[i]).mesh.visible = !!t.visible,
                "video" === t.texture.type && t.texture.el && t.texture.loaded && (t.texture.el.readyState >= t.texture.el.HAVE_ENOUGH_DATA && (!t.texture.tex.image && (t.texture.tex.image = t.texture.el),
                t.texture.tex.needsUpdate = !0),
                t.visible ? t.texture.el.paused && t.texture.el.play() : t.texture.el.pause());
                var n = __WW__
                  , s = 1440 * __WW__ / 2160
                  , r = n / 24 * 8 * pageTransition.pages.home.fast
                  , o = s / 24 * 8 * pageTransition.pages.home.fast
                  , a = (n = __WW__,
                s = __WW__ * t.ratio.h / t.ratio.w,
                n / 24 * 7 * pageTransition.pages.about.fast)
                  , l = s / 24 * 7 * pageTransition.pages.about.fast
                  , h = t.slide.rect.width * pageTransition.pages["archive-project"].fast
                  , c = t.slide.rect.height * pageTransition.pages["archive-project"].fast;
                t.mesh.scale.x = r + h + a,
                t.mesh.scale.y = o + c + l,
                t.mesh.scale.z = 1,
                t.program.uniforms.resolution.value[0] = t.mesh.scale.x,
                t.program.uniforms.resolution.value[1] = t.mesh.scale.y,
                t.program.uniforms.iResolution.value[0] = t.ratio.w,
                t.program.uniforms.iResolution.value[1] = t.ratio.h;
                var u = (mouseEvent.delta.x - __WW__ / 2) * pageTransition.pages.home.fast
                  , d = (__WH__ / 2 - mouseEvent.delta.y) * pageTransition.pages.home.fast
                  , f = .5 * mouseEvent.delta.cx * pageTransition.pages.home.fast
                  , p = .5 * -mouseEvent.delta.cy * pageTransition.pages.home.fast
                  , m = .5 * t.slide.padding.x
                  , g = 0
                  , v = (t.slide.x - __WW__ / 2 + m + h / 2) * pageTransition.pages["archive-project"].fast
                  , y = g;
                t.visible || (v = -9999 * pageTransition.pages["archive-project"].fast),
                0 == e % 2 ? y += m : y -= m;
                m = .5 * t.slide.offset.x * pageTransition.pages["archive-project"].fast,
                g = 0;
                var w = (mouseEvent.delta.x - __WW__ / 2) * pageTransition.pages.about.fast
                  , _ = (__WH__ / 2 - mouseEvent.delta.y) * pageTransition.pages.about.fast
                  , b = .5 * mouseEvent.delta.cx * pageTransition.pages.about.fast
                  , x = .5 * -mouseEvent.delta.cy * pageTransition.pages.about.fast
                  , E = _ + d + y
                  , T = b + f + m;
                t.mesh.position.x = w + u + v,
                t.mesh.position.y = __DETECT__.device.any ? 0 : E,
                t.program.uniforms.offset.value[0] = __DETECT__.device.any ? .25 * T : T,
                t.program.uniforms.offset.value[1] = x + p + g,
                t.program.uniforms.clipTop.value[0] = t.uniforms.clipTop.x,
                t.program.uniforms.clipTop.value[1] = t.uniforms.clipTop.y,
                t.program.uniforms.clipBottom.value[0] = t.uniforms.clipBottom.x,
                t.program.uniforms.clipBottom.value[1] = t.uniforms.clipBottom.y,
                t.program.uniforms.scale.value[0] = t.uniforms.scale.x,
                t.program.uniforms.scale.value[1] = t.uniforms.scale.y,
                "project" === t.type && e++
            }
            var S = Math.PI / 180 * -15 * pageTransition.pages["archive-project"].fast;
            this.stage.rotation.z = S
        }
    }

*/
