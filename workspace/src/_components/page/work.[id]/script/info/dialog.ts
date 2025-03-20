import { defineComponent } from "lake";

export default defineComponent({
  name: "InfoDialog",
  setup(el, context) {
    //
  },
});

/*
function(e, t) {
	window.singleScroll = {
			isopen: !1,
			scroll: {
				enable: !0,
				dist: 0,
				delta: 0,
				auto: 0,
				y: 0,
				top: 0,
				progress: 0,
				tweens: [],
				height: 0,
				wrap: {
					el: null
				},
				body: {
					el: null,
					rect: {
						height: 0
					}
				},
				before: {
					el: null,
					rect: {
						height: 0
					}
				},
				after: {
					el: null,
					rect: {
						height: 0
					}
				}
			},
			ready: !1,
			local: {},
			blank: {},
			btn: {},
			once() {
				const e = this;
				this.btn.el = document.querySelector(".ui-credit"), this.btn.el.addEventListener(
						"click", (t => {
							t.preventDefault(), e.onToggle()
						})), this.blank.el = document.querySelector(".ui-blank"), this.blank.label =
					document.querySelector(".ui-blank .l"), this.blank.el && domglScroll.scroll
					.contents.elems.forEach(((e, t) => {
						isCurrentLocation(e.project.link) && (e.project.blank.url && e.project.blank
							.label ? (this.blank.el.classList.remove("disable"), this.blank.el.setAttribute(
									"href", e.project.blank.url), this.blank.label.innerText = e.project
								.blank.label) : this.blank.el.classList.add("disable"))
					}))
			},
			onReset() {
				this.ready = !1, this.scroll.auto = 0, this.touch.active = !1,
					scrollControl.onReset()
			},
			onInit() {
				let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
					t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :
					document;
				if (this.local.el = t || document.querySelector(".local"), this.onReset(),
					"single" === pageTransition.current.name) e || (this.onInitScroll(t), this
					.onResize())
			},
			onInitScroll() {
				let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :
					document;
				this.scroll.wrap.el = e.querySelector(".c-wrap"), this.scroll.body.el = e.querySelector(
						".c-scroll"), this.scroll.before.el = e.querySelector(".c-before"), this.scroll
					.after.el = e.querySelector(".c-after"), this.ready = !0
			},
			onResize() {
				this.scroll.body.el && this.ready && (this.scroll.body.rect = this.scroll.body
					.el.getBoundingClientRect(), this.scroll.height = this.scroll.body.rect.height -
					window.innerHeight, this.scroll.height <= 0 ? this.scroll.enable = !1 :
					this.scroll.enable = !0, scrollControl.onResize(window.innerHeight / this
						.scroll.body.rect.height, this.scroll.body.rect.height), this.scroll.before
					.rect = this.scroll.before.el.getBoundingClientRect(), this.scroll.after.rect =
					this.scroll.after.el.getBoundingClientRect(), this.scroll.auto = 0, this.scroll
					.delta = this.scroll.y = this.scroll.before.rect.height)
			},
			onWheel(e) {
				this.scroll.delta += -getWheelDistY(e) * EASE_CONTROL.page.ratio
			},
			onScrollTo(e) {
				const t = Math.max(e, 0);
				this.scroll.delta = t
			},
			touch: {
				ratio: 2,
				start: {
					delta: 0
				}
			},
			onTouchStart() {
				if (!singleScroll.isopen) return !1;
				this.touch.start.delta = this.scroll.delta
			},
			onTouchMove() {
				if (!singleScroll.isopen) return !1;
				this.scroll.delta = touchEvent.dist.y * this.touch.ratio + this.touch.start
					.delta
			},
			onTouchEnd() {
				if (!singleScroll.isopen) return !1
			},
			onUpdate() {
				if (!(this.scroll.body.el && this.ready && this.scroll.enable && this.isopen))
					return !1;
				this.scroll.auto += .5, this.scroll.top < 0 && (this.scroll.auto = 0, this.touch
						.start.delta = this.scroll.top = this.scroll.y = this.scroll.delta = this
						.scroll.height), this.scroll.y += (this.scroll.delta + this.scroll.auto -
						this.scroll.y) * EASE_CONTROL.page.ease, this.scroll.top = this.scroll.y %
					this.scroll.height, this.scroll.progress = this.scroll.top / this.scroll.height,
					this.scroll.body.el.style.transform = "translate3d(0px, " + -1 * this.scroll
					.top + "px, 0)", DETECT.device.any || scrollControl.onUpdate(this.scroll.progress, !
						1)
			},
    }
  }
*/
