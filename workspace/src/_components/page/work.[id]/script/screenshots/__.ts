import {
  L as os,
  m as $,
  i as Ce,
  p as Ct,
  n as D,
  Z as Dt,
  R as Ge,
  H as He,
  w as Me,
  J as Oe,
  W as Ot,
  U as Pt,
  h as Q,
  S as Qe,
  A as Qt,
  V as Se,
  F as St,
  I as Tt,
  a as Ve,
  P as We,
  Q as Ze,
  u as Zt,
  j as ae,
  N as as,
  X as cs,
  l as d,
  q as es,
  d as he,
  O as is,
  x as kt,
  _ as ls,
  G as me,
  K as ns,
  Y as ps,
  g as re,
  y as rs,
  o as se,
  T as ss,
  B as ts,
  r as u,
  E as us,
  v as x,
  t as xe,
  s as y,
} from "./CPV2dzow.js";
import { _ as vs } from "./DzPFiXbK.js";
import { s as hs } from "./LlereMw0.js";
import { b as fs, c as At, a as Le, S as ct, u as ds } from "./gmpmigCU.js";
const ms = {
    class: "container",
  },
  _s = {
    class: "left",
  },
  gs = {
    class: "right",
  },
  ys = {
    class: "label",
  },
  ws = he({
    __name: "Header",
    setup(s) {
      const e = Zt(),
        t = kt(),
        r = Q(() => e.name === "about"),
        n = Ve(),
        o = u(null),
        a = (p, i) => {
          const b = x.timeline();
          b.textReveal(p.querySelector(".label"), {
            mode: "enter",
          }),
            b.call(i);
        },
        l = (p, i) => {
          const b = x.timeline();
          b.textReveal(p.querySelector(".label"), {
            mode: "leave",
          }),
            b.call(i);
        },
        h = (p) => {
          var i;
          p.key === "i" &&
            (r.value
              ? t.push({
                  name: "slug",
                  params: {
                    slug: (i = n.currentWork) == null ? void 0 : i.slug,
                  },
                })
              : t.push({
                  name: "about",
                }));
        };
      return (
        Ce(() => {
          const p = o.value.querySelectorAll(".label");
          x.set(p, {
            opacity: 1,
            yPercent: 100,
          }),
            document.addEventListener("keydown", h),
            fs(() => {
              x.timeline().textReveal(p, {
                mode: "enter",
              });
            }),
            He(() => {
              document.removeEventListener("keydown", h);
            });
        }),
        (p, i) => {
          const b = Tt,
            _ = rs;
          return (
            se(),
            re(
              "div",
              {
                ref_key: "el",
                ref: o,
                class: "layout-header",
              },
              [
                d("div", ms, [
                  d("div", _s, [
                    $(
                      b,
                      {
                        to: {
                          name: "index",
                        },
                      },
                      {
                        default: xe(
                          () =>
                            i[0] ||
                            (i[0] = [
                              d(
                                "span",
                                {
                                  class: "label",
                                },
                                "T—M",
                                -1,
                              ),
                            ]),
                        ),
                        _: 1,
                      },
                    ),
                  ]),
                  d("div", gs, [
                    $(
                      ss,
                      {
                        onEnter: a,
                        onLeave: l,
                      },
                      {
                        default: xe(() => [
                          Qt(
                            $(
                              b,
                              {
                                to: {
                                  name: "about",
                                },
                              },
                              {
                                default: xe(() => [
                                  d("span", ys, [
                                    $(
                                      _,
                                      {
                                        "fix-blend": "",
                                      },
                                      {
                                        default: xe(() => i[1] || (i[1] = [es("Info")])),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                ]),
                                _: 1,
                              },
                              512,
                            ),
                            [[ts, !D(r)]],
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                ]),
              ],
              512,
            )
          );
        }
      );
    },
  }),
  bs = me(ws, [["__scopeId", "data-v-f733a012"]]),
  Es = he({
    __name: "ProjectThumb",
    props: {
      asset: {},
      withBackground: {
        type: Boolean,
      },
      lazy: {
        type: Boolean,
      },
      spacing: {},
      unwrap: {
        type: Boolean,
      },
    },
    setup(s, { expose: e }) {
      const t = s,
        r = u(null),
        n = u(null),
        o = u(null),
        a = u(null),
        l = u(null),
        h = u(null),
        p = u(null),
        i = u(null);
      return (
        e({
          el: r,
          wrapper1El: n,
          wrapper2El: o,
          wrapper3El: a,
          wrapper4El: l,
          wrapper5El: h,
          assetEl: p,
          media: i,
        }),
        (b, _) => (
          se(),
          re(
            "div",
            {
              ref_key: "el",
              ref: r,
              class: Oe([
                "project-thumb",
                [
                  `spacing-${t.spacing}`,
                  {
                    "with-background": t.withBackground,
                  },
                ],
              ]),
            },
            [
              b.unwrap
                ? (se(),
                  re(
                    "div",
                    {
                      key: 1,
                      ref_key: "wrapper4El",
                      ref: l,
                      class: "wrapper wrapper-4",
                    },
                    [
                      $(
                        D(ct),
                        {
                          ref_key: "media",
                          ref: i,
                          asset: t.asset,
                          lazy: t.lazy,
                        },
                        null,
                        8,
                        ["asset", "lazy"],
                      ),
                    ],
                    512,
                  ))
                : (se(),
                  re(
                    "div",
                    {
                      key: 0,
                      ref_key: "wrapper1El",
                      ref: n,
                      class: "wrapper wrapper-1",
                    },
                    [
                      d(
                        "div",
                        {
                          ref_key: "wrapper2El",
                          ref: o,
                          class: "wrapper wrapper-2",
                        },
                        [
                          d(
                            "div",
                            {
                              ref_key: "wrapper3El",
                              ref: a,
                              class: "wrapper wrapper-3",
                            },
                            [
                              d(
                                "div",
                                {
                                  ref_key: "wrapper4El",
                                  ref: l,
                                  class: "wrapper wrapper-4",
                                },
                                [
                                  d(
                                    "div",
                                    {
                                      ref_key: "wrapper5El",
                                      ref: h,
                                      class: "wrapper wrapper-5",
                                    },
                                    [
                                      $(
                                        D(ct),
                                        {
                                          ref_key: "media",
                                          ref: i,
                                          asset: t.asset,
                                          lazy: t.lazy,
                                        },
                                        null,
                                        8,
                                        ["asset", "lazy"],
                                      ),
                                    ],
                                    512,
                                  ),
                                ],
                                512,
                              ),
                            ],
                            512,
                          ),
                        ],
                        512,
                      ),
                    ],
                    512,
                  )),
            ],
            2,
          )
        )
      );
    },
  }),
  Xe = me(Es, [["__scopeId", "data-v-d7017505"]]),
  xs = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "9",
    height: "7",
    fill: "none",
    viewBox: "0 0 9 7",
  };
function ks(s, e) {
  return (
    se(),
    re(
      "svg",
      xs,
      e[0] ||
        (e[0] = [
          d(
            "path",
            {
              fill: "currentColor",
              "fill-rule": "evenodd",
              d: "M6.568.439 6.129 0l-.877.877.439.439 1.241 1.241h-3.98L1.78.646 1.456.117.398.765l.325.529 1.231 2.01c.188.307.522.494.882.494h4.08L5.69 5.023l-.439.438.877.877.439-.438 2.146-2.146a.827.827 0 0 0 0-1.17z",
              "clip-rule": "evenodd",
            },
            null,
            -1,
          ),
        ]),
    )
  );
}
const jt = {
  render: ks,
};
function Ts(s, e, t) {
  return Math.max(e, Math.min(s, t));
}
const q = {
  toVector(s, e) {
    return s === void 0 && (s = e), Array.isArray(s) ? s : [s, s];
  },
  add(s, e) {
    return [s[0] + e[0], s[1] + e[1]];
  },
  sub(s, e) {
    return [s[0] - e[0], s[1] - e[1]];
  },
  addTo(s, e) {
    (s[0] += e[0]), (s[1] += e[1]);
  },
  subTo(s, e) {
    (s[0] -= e[0]), (s[1] -= e[1]);
  },
};
function pt(s, e, t) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(s, t * 5) : (s * e * t) / (e + t * s);
}
function ft(s, e, t, r = 0.15) {
  return r === 0
    ? Ts(s, e, t)
    : s < e
      ? -pt(e - s, t - e, r) + e
      : s > t
        ? +pt(s - t, t - e, r) + t
        : s;
}
function Ps(s, [e, t], [r, n]) {
  const [[o, a], [l, h]] = s;
  return [ft(e, o, a, r), ft(t, l, h, n)];
}
function Ss(s, e) {
  if (typeof s != "object" || s === null) return s;
  var t = s[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(s, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(s);
}
function Cs(s) {
  var e = Ss(s, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Z(s, e, t) {
  return (
    (e = Cs(e)),
    e in s
      ? Object.defineProperty(s, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (s[e] = t),
    s
  );
}
function dt(s, e) {
  var t = Object.keys(s);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(s);
    e && (r = r.filter((n) => Object.getOwnPropertyDescriptor(s, n).enumerable)),
      t.push.apply(t, r);
  }
  return t;
}
function L(s) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? dt(Object(t), !0).forEach((r) => {
          Z(s, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(t))
        : dt(Object(t)).forEach((r) => {
            Object.defineProperty(s, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return s;
}
const It = {
  pointer: {
    start: "down",
    change: "move",
    end: "up",
  },
  mouse: {
    start: "down",
    change: "move",
    end: "up",
  },
  touch: {
    start: "start",
    change: "move",
    end: "end",
  },
  gesture: {
    start: "start",
    change: "change",
    end: "end",
  },
};
function vt(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : "";
}
const Os = ["enter", "leave"];
function Ds(s = !1, e) {
  return s && !Os.includes(e);
}
function As(s, e = "", t = !1) {
  const r = It[s],
    n = (r && r[e]) || e;
  return "on" + vt(s) + vt(n) + (Ds(t, n) ? "Capture" : "");
}
const js = ["gotpointercapture", "lostpointercapture"];
function Is(s) {
  let e = s.substring(2).toLowerCase();
  const t = !!~e.indexOf("passive");
  t && (e = e.replace("passive", ""));
  const r = js.includes(e) ? "capturecapture" : "capture",
    n = !!~e.indexOf(r);
  return (
    n && (e = e.replace("capture", "")),
    {
      device: e,
      capture: n,
      passive: t,
    }
  );
}
function Ms(s, e = "") {
  const t = It[s],
    r = (t && t[e]) || e;
  return s + r;
}
function Ke(s) {
  return "touches" in s;
}
function Mt(s) {
  return Ke(s) ? "touch" : "pointerType" in s ? s.pointerType : "mouse";
}
function Ls(s) {
  return Array.from(s.touches).filter((e) => {
    var t, r;
    return (
      e.target === s.currentTarget ||
      ((t = s.currentTarget) === null || t === void 0 || (r = t.contains) === null || r === void 0
        ? void 0
        : r.call(t, e.target))
    );
  });
}
function Rs(s) {
  return s.type === "touchend" || s.type === "touchcancel" ? s.changedTouches : s.targetTouches;
}
function Lt(s) {
  return Ke(s) ? Rs(s)[0] : s;
}
function Bs(s) {
  return Ls(s).map((e) => e.identifier);
}
function Fe(s) {
  const e = Lt(s);
  return Ke(s) ? e.identifier : e.pointerId;
}
function ht(s) {
  const e = Lt(s);
  return [e.clientX, e.clientY];
}
const mt = 40,
  _t = 800;
function $s(s) {
  let { deltaX: e, deltaY: t, deltaMode: r } = s;
  return r === 1 ? ((e *= mt), (t *= mt)) : r === 2 && ((e *= _t), (t *= _t)), [e, t];
}
function Vs(s) {
  const e = {};
  if (("buttons" in s && (e.buttons = s.buttons), "shiftKey" in s)) {
    const { shiftKey: t, altKey: r, metaKey: n, ctrlKey: o } = s;
    Object.assign(e, {
      shiftKey: t,
      altKey: r,
      metaKey: n,
      ctrlKey: o,
    });
  }
  return e;
}
function $e(s, ...e) {
  return typeof s == "function" ? s(...e) : s;
}
function Hs() {}
function Ws(...s) {
  return s.length === 0
    ? Hs
    : s.length === 1
      ? s[0]
      : function () {
          let e;
          for (const t of s) e = t.apply(this, arguments) || e;
          return e;
        };
}
function gt(s, e) {
  return Object.assign({}, e, s || {});
}
const Ks = 32;
class Us {
  constructor(e, t, r) {
    (this.ctrl = e),
      (this.args = t),
      (this.key = r),
      this.state ||
        ((this.state = {}),
        this.computeValues([0, 0]),
        this.computeInitial(),
        this.init && this.init(),
        this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(e) {
    this.ctrl.state[this.key] = e;
  }
  get shared() {
    return this.ctrl.state.shared;
  }
  get eventStore() {
    return this.ctrl.gestureEventStores[this.key];
  }
  get timeoutStore() {
    return this.ctrl.gestureTimeoutStores[this.key];
  }
  get config() {
    return this.ctrl.config[this.key];
  }
  get sharedConfig() {
    return this.ctrl.config.shared;
  }
  get handler() {
    return this.ctrl.handlers[this.key];
  }
  reset() {
    const { state: e, shared: t, ingKey: r, args: n } = this;
    (t[r] = e._active = e.active = e._blocked = e._force = !1),
      (e._step = [!1, !1]),
      (e.intentional = !1),
      (e._movement = [0, 0]),
      (e._distance = [0, 0]),
      (e._direction = [0, 0]),
      (e._delta = [0, 0]),
      (e._bounds = [
        [-1 / 0, 1 / 0],
        [-1 / 0, 1 / 0],
      ]),
      (e.args = n),
      (e.axis = void 0),
      (e.memo = void 0),
      (e.elapsedTime = e.timeDelta = 0),
      (e.direction = [0, 0]),
      (e.distance = [0, 0]),
      (e.overflow = [0, 0]),
      (e._movementBound = [!1, !1]),
      (e.velocity = [0, 0]),
      (e.movement = [0, 0]),
      (e.delta = [0, 0]),
      (e.timeStamp = 0);
  }
  start(e) {
    const t = this.state,
      r = this.config;
    t._active ||
      (this.reset(),
      this.computeInitial(),
      (t._active = !0),
      (t.target = e.target),
      (t.currentTarget = e.currentTarget),
      (t.lastOffset = r.from ? $e(r.from, t) : t.offset),
      (t.offset = t.lastOffset),
      (t.startTime = t.timeStamp = e.timeStamp));
  }
  computeValues(e) {
    const t = this.state;
    (t._values = e), (t.values = this.config.transform(e));
  }
  computeInitial() {
    const e = this.state;
    (e._initial = e._values), (e.initial = e.values);
  }
  compute(e) {
    const { state: t, config: r, shared: n } = this;
    t.args = this.args;
    let o = 0;
    if (
      (e &&
        ((t.event = e),
        r.preventDefault && e.cancelable && t.event.preventDefault(),
        (t.type = e.type),
        (n.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size),
        (n.locked = !!document.pointerLockElement),
        Object.assign(n, Vs(e)),
        (n.down = n.pressed = n.buttons % 2 === 1 || n.touches > 0),
        (o = e.timeStamp - t.timeStamp),
        (t.timeStamp = e.timeStamp),
        (t.elapsedTime = t.timeStamp - t.startTime)),
      t._active)
    ) {
      const R = t._delta.map(Math.abs);
      q.addTo(t._distance, R);
    }
    this.axisIntent && this.axisIntent(e);
    const [a, l] = t._movement,
      [h, p] = r.threshold,
      { _step: i, values: b } = t;
    if (
      (r.hasCustomTransform
        ? (i[0] === !1 && (i[0] = Math.abs(a) >= h && b[0]),
          i[1] === !1 && (i[1] = Math.abs(l) >= p && b[1]))
        : (i[0] === !1 && (i[0] = Math.abs(a) >= h && Math.sign(a) * h),
          i[1] === !1 && (i[1] = Math.abs(l) >= p && Math.sign(l) * p)),
      (t.intentional = i[0] !== !1 || i[1] !== !1),
      !t.intentional)
    )
      return;
    const _ = [0, 0];
    if (r.hasCustomTransform) {
      const [R, K] = b;
      (_[0] = i[0] !== !1 ? R - i[0] : 0), (_[1] = i[1] !== !1 ? K - i[1] : 0);
    } else (_[0] = i[0] !== !1 ? a - i[0] : 0), (_[1] = i[1] !== !1 ? l - i[1] : 0);
    this.restrictToAxis && !t._blocked && this.restrictToAxis(_);
    const j = t.offset,
      Y = (t._active && !t._blocked) || t.active;
    Y &&
      ((t.first = t._active && !t.active),
      (t.last = !t._active && t.active),
      (t.active = n[this.ingKey] = t._active),
      e &&
        (t.first && ("bounds" in r && (t._bounds = $e(r.bounds, t)), this.setup && this.setup()),
        (t.movement = _),
        this.computeOffset()));
    const [ee, H] = t.offset,
      [[z, G], [k, I]] = t._bounds;
    (t.overflow = [ee < z ? -1 : ee > G ? 1 : 0, H < k ? -1 : H > I ? 1 : 0]),
      (t._movementBound[0] = t.overflow[0]
        ? t._movementBound[0] === !1
          ? t._movement[0]
          : t._movementBound[0]
        : !1),
      (t._movementBound[1] = t.overflow[1]
        ? t._movementBound[1] === !1
          ? t._movement[1]
          : t._movementBound[1]
        : !1);
    const W = t._active ? r.rubberband || [0, 0] : [0, 0];
    if (
      ((t.offset = Ps(t._bounds, t.offset, W)),
      (t.delta = q.sub(t.offset, j)),
      this.computeMovement(),
      Y && (!t.last || o > Ks))
    ) {
      t.delta = q.sub(t.offset, j);
      const R = t.delta.map(Math.abs);
      q.addTo(t.distance, R),
        (t.direction = t.delta.map(Math.sign)),
        (t._direction = t._delta.map(Math.sign)),
        !t.first && o > 0 && ((t.velocity = [R[0] / o, R[1] / o]), (t.timeDelta = o));
    }
  }
  emit() {
    const e = this.state,
      t = this.shared,
      r = this.config;
    if (
      (e._active || this.clean(),
      (e._blocked || !e.intentional) && !e._force && !r.triggerAllEvents)
    )
      return;
    const n = this.handler(
      L(
        L(L({}, t), e),
        {},
        {
          [this.aliasKey]: e.values,
        },
      ),
    );
    n !== void 0 && (e.memo = n);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function qs([s, e], t) {
  const r = Math.abs(s),
    n = Math.abs(e);
  if (r > n && r > t) return "x";
  if (n > r && n > t) return "y";
}
class Rt extends Us {
  constructor(...e) {
    super(...e), Z(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), (this.state.axis = void 0);
  }
  init() {
    (this.state.offset = [0, 0]), (this.state.lastOffset = [0, 0]);
  }
  computeOffset() {
    this.state.offset = q.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = q.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(e) {
    const t = this.state,
      r = this.config;
    if (!t.axis && e) {
      const n = typeof r.axisThreshold == "object" ? r.axisThreshold[Mt(e)] : r.axisThreshold;
      t.axis = qs(t._movement, n);
    }
    t._blocked = ((r.lockDirection || !!r.axis) && !t.axis) || (!!r.axis && r.axis !== t.axis);
  }
  restrictToAxis(e) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          e[1] = 0;
          break;
        case "y":
          e[0] = 0;
          break;
      }
  }
}
const Ys = (s) => s,
  yt = 0.15,
  Bt = {
    enabled(s = !0) {
      return s;
    },
    eventOptions(s, e, t) {
      return L(L({}, t.shared.eventOptions), s);
    },
    preventDefault(s = !1) {
      return s;
    },
    triggerAllEvents(s = !1) {
      return s;
    },
    rubberband(s = 0) {
      switch (s) {
        case !0:
          return [yt, yt];
        case !1:
          return [0, 0];
        default:
          return q.toVector(s);
      }
    },
    from(s) {
      if (typeof s == "function") return s;
      if (s != null) return q.toVector(s);
    },
    transform(s, e, t) {
      const r = s || t.shared.transform;
      return (this.hasCustomTransform = !!r), r || Ys;
    },
    threshold(s) {
      return q.toVector(s, 0);
    },
  },
  zs = 0,
  ke = L(
    L({}, Bt),
    {},
    {
      axis(s, e, { axis: t }) {
        if (((this.lockDirection = t === "lock"), !this.lockDirection)) return t;
      },
      axisThreshold(s = zs) {
        return s;
      },
      bounds(s = {}) {
        if (typeof s == "function") return (o) => ke.bounds(s(o));
        if ("current" in s) return () => s.current;
        if (typeof HTMLElement == "function" && s instanceof HTMLElement) return s;
        const { left: e = -1 / 0, right: t = 1 / 0, top: r = -1 / 0, bottom: n = 1 / 0 } = s;
        return [
          [e, t],
          [r, n],
        ];
      },
    },
  ),
  wt = {
    ArrowRight: (s, e = 1) => [s * e, 0],
    ArrowLeft: (s, e = 1) => [-1 * s * e, 0],
    ArrowUp: (s, e = 1) => [0, -1 * s * e],
    ArrowDown: (s, e = 1) => [0, s * e],
  };
class Ns extends Rt {
  constructor(...e) {
    super(...e), Z(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const e = this.state;
    (e._pointerId = void 0),
      (e._pointerActive = !1),
      (e._keyboardActive = !1),
      (e._preventScroll = !1),
      (e._delayed = !1),
      (e.swipe = [0, 0]),
      (e.tap = !1),
      (e.canceled = !1),
      (e.cancel = this.cancel.bind(this));
  }
  setup() {
    const e = this.state;
    if (e._bounds instanceof HTMLElement) {
      const t = e._bounds.getBoundingClientRect(),
        r = e.currentTarget.getBoundingClientRect(),
        n = {
          left: t.left - r.left + e.offset[0],
          right: t.right - r.right + e.offset[0],
          top: t.top - r.top + e.offset[1],
          bottom: t.bottom - r.bottom + e.offset[1],
        };
      e._bounds = ke.bounds(n);
    }
  }
  cancel() {
    const e = this.state;
    e.canceled ||
      ((e.canceled = !0),
      (e._active = !1),
      setTimeout(() => {
        this.compute(), this.emit();
      }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(),
      (this.state._pointerActive = !1),
      (this.state._keyboardActive = !1),
      super.clean();
  }
  pointerDown(e) {
    const t = this.config,
      r = this.state;
    if (
      e.buttons != null &&
      (Array.isArray(t.pointerButtons)
        ? !t.pointerButtons.includes(e.buttons)
        : t.pointerButtons !== -1 && t.pointerButtons !== e.buttons)
    )
      return;
    const n = this.ctrl.setEventIds(e);
    t.pointerCapture && e.target.setPointerCapture(e.pointerId),
      !(n && n.size > 1 && r._pointerActive) &&
        (this.start(e),
        this.setupPointer(e),
        (r._pointerId = Fe(e)),
        (r._pointerActive = !0),
        this.computeValues(ht(e)),
        this.computeInitial(),
        t.preventScrollAxis && Mt(e) !== "mouse"
          ? ((r._active = !1), this.setupScrollPrevention(e))
          : t.delay > 0
            ? (this.setupDelayTrigger(e), t.triggerAllEvents && (this.compute(e), this.emit()))
            : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const t = this.state;
    (t._active = !0), (t._preventScroll = !0), (t._delayed = !1), this.compute(e), this.emit();
  }
  pointerMove(e) {
    const t = this.state,
      r = this.config;
    if (!t._pointerActive) return;
    const n = Fe(e);
    if (t._pointerId !== void 0 && n !== t._pointerId) return;
    const o = ht(e);
    if (
      (document.pointerLockElement === e.target
        ? (t._delta = [e.movementX, e.movementY])
        : ((t._delta = q.sub(o, t._values)), this.computeValues(o)),
      q.addTo(t._movement, t._delta),
      this.compute(e),
      t._delayed && t.intentional)
    ) {
      this.timeoutStore.remove("dragDelay"), (t.active = !1), this.startPointerDrag(e);
      return;
    }
    if (r.preventScrollAxis && !t._preventScroll)
      if (t.axis)
        if (t.axis === r.preventScrollAxis || r.preventScrollAxis === "xy") {
          (t._active = !1), this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(e);
          return;
        }
      else return;
    this.emit();
  }
  pointerUp(e) {
    this.ctrl.setEventIds(e);
    try {
      this.config.pointerCapture &&
        e.target.hasPointerCapture(e.pointerId) &&
        e.target.releasePointerCapture(e.pointerId);
    } catch {}
    const t = this.state,
      r = this.config;
    if (!t._active || !t._pointerActive) return;
    const n = Fe(e);
    if (t._pointerId !== void 0 && n !== t._pointerId) return;
    (this.state._pointerActive = !1), this.setActive(), this.compute(e);
    const [o, a] = t._distance;
    if (((t.tap = o <= r.tapsThreshold && a <= r.tapsThreshold), t.tap && r.filterTaps))
      t._force = !0;
    else {
      const [l, h] = t._delta,
        [p, i] = t._movement,
        [b, _] = r.swipe.velocity,
        [j, Y] = r.swipe.distance,
        ee = r.swipe.duration;
      if (t.elapsedTime < ee) {
        const H = Math.abs(l / t.timeDelta),
          z = Math.abs(h / t.timeDelta);
        H > b && Math.abs(p) > j && (t.swipe[0] = Math.sign(l)),
          z > _ && Math.abs(i) > Y && (t.swipe[1] = Math.sign(h));
      }
    }
    this.emit();
  }
  pointerClick(e) {
    !this.state.tap && e.detail > 0 && (e.preventDefault(), e.stopPropagation());
  }
  setupPointer(e) {
    const t = this.config,
      r = t.device;
    t.pointerLock && e.currentTarget.requestPointerLock(),
      t.pointerCapture ||
        (this.eventStore.add(this.sharedConfig.window, r, "change", this.pointerMove.bind(this)),
        this.eventStore.add(this.sharedConfig.window, r, "end", this.pointerUp.bind(this)),
        this.eventStore.add(this.sharedConfig.window, r, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock &&
      document.pointerLockElement === this.state.currentTarget &&
      document.exitPointerLock();
  }
  preventScroll(e) {
    this.state._preventScroll && e.cancelable && e.preventDefault();
  }
  setupScrollPrevention(e) {
    (this.state._preventScroll = !1), Gs(e);
    const t = this.eventStore.add(
      this.sharedConfig.window,
      "touch",
      "change",
      this.preventScroll.bind(this),
      {
        passive: !1,
      },
    );
    this.eventStore.add(this.sharedConfig.window, "touch", "end", t),
      this.eventStore.add(this.sharedConfig.window, "touch", "cancel", t),
      this.timeoutStore.add(
        "startPointerDrag",
        this.startPointerDrag.bind(this),
        this.config.preventScrollDelay,
        e,
      );
  }
  setupDelayTrigger(e) {
    (this.state._delayed = !0),
      this.timeoutStore.add(
        "dragDelay",
        () => {
          (this.state._step = [0, 0]), this.startPointerDrag(e);
        },
        this.config.delay,
      );
  }
  keyDown(e) {
    const t = wt[e.key];
    if (t) {
      const r = this.state,
        n = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e),
        (r._delta = t(this.config.keyboardDisplacement, n)),
        (r._keyboardActive = !0),
        q.addTo(r._movement, r._delta),
        this.compute(e),
        this.emit();
    }
  }
  keyUp(e) {
    e.key in wt &&
      ((this.state._keyboardActive = !1), this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const t = this.config.device;
    e(t, "start", this.pointerDown.bind(this)),
      this.config.pointerCapture &&
        (e(t, "change", this.pointerMove.bind(this)),
        e(t, "end", this.pointerUp.bind(this)),
        e(t, "cancel", this.pointerUp.bind(this)),
        e("lostPointerCapture", "", this.pointerUp.bind(this))),
      this.config.keys &&
        (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))),
      this.config.filterTaps &&
        e("click", "", this.pointerClick.bind(this), {
          capture: !0,
          passive: !1,
        });
  }
}
function Gs(s) {
  "persist" in s && typeof s.persist == "function" && s.persist();
}
const De = typeof window < "u" && window.document && window.document.createElement;
function $t() {
  return De && "ontouchstart" in window;
}
function Fs() {
  return $t() || (De && window.navigator.maxTouchPoints > 1);
}
function Xs() {
  return De && "onpointerdown" in window;
}
function Js() {
  return De && "exitPointerLock" in window.document;
}
function Zs() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const oe = {
    isBrowser: De,
    gesture: Zs(),
    touch: $t(),
    touchscreen: Fs(),
    pointer: Xs(),
    pointerLock: Js(),
  },
  Qs = 250,
  er = 180,
  tr = 0.5,
  sr = 50,
  rr = 250,
  nr = 10,
  bt = {
    mouse: 0,
    touch: 0,
    pen: 8,
  },
  or = L(
    L({}, ke),
    {},
    {
      device(s, e, { pointer: { touch: t = !1, lock: r = !1, mouse: n = !1 } = {} }) {
        return (
          (this.pointerLock = r && oe.pointerLock),
          oe.touch && t
            ? "touch"
            : this.pointerLock
              ? "mouse"
              : oe.pointer && !n
                ? "pointer"
                : oe.touch
                  ? "touch"
                  : "mouse"
        );
      },
      preventScrollAxis(s, e, { preventScroll: t }) {
        if (
          ((this.preventScrollDelay =
            typeof t == "number" ? t : t || (t === void 0 && s) ? Qs : void 0),
          !(!oe.touchscreen || t === !1))
        )
          return s || (t !== void 0 ? "y" : void 0);
      },
      pointerCapture(s, e, { pointer: { capture: t = !0, buttons: r = 1, keys: n = !0 } = {} }) {
        return (
          (this.pointerButtons = r),
          (this.keys = n),
          !this.pointerLock && this.device === "pointer" && t
        );
      },
      threshold(s, e, { filterTaps: t = !1, tapsThreshold: r = 3, axis: n = void 0 }) {
        const o = q.toVector(s, t ? r : n ? 1 : 0);
        return (this.filterTaps = t), (this.tapsThreshold = r), o;
      },
      swipe({ velocity: s = tr, distance: e = sr, duration: t = rr } = {}) {
        return {
          velocity: this.transform(q.toVector(s)),
          distance: this.transform(q.toVector(e)),
          duration: t,
        };
      },
      delay(s = 0) {
        switch (s) {
          case !0:
            return er;
          case !1:
            return 0;
          default:
            return s;
        }
      },
      axisThreshold(s) {
        return s ? L(L({}, bt), s) : bt;
      },
      keyboardDisplacement(s = nr) {
        return s;
      },
    },
  );
function ar(s) {
  const [e, t] = s.overflow,
    [r, n] = s._delta,
    [o, a] = s._direction;
  ((e < 0 && r > 0 && o < 0) || (e > 0 && r < 0 && o > 0)) &&
    (s._movement[0] = s._movementBound[0]),
    ((t < 0 && n > 0 && a < 0) || (t > 0 && n < 0 && a > 0)) &&
      (s._movement[1] = s._movementBound[1]);
}
L(
  L({}, Bt),
  {},
  {
    device(s, e, { shared: t, pointer: { touch: r = !1 } = {} }) {
      if (t.target && !oe.touch && oe.gesture) return "gesture";
      if (oe.touch && r) return "touch";
      if (oe.touchscreen) {
        if (oe.pointer) return "pointer";
        if (oe.touch) return "touch";
      }
    },
    bounds(s, e, { scaleBounds: t = {}, angleBounds: r = {} }) {
      const n = (a) => {
          const l = gt($e(t, a), {
            min: -1 / 0,
            max: 1 / 0,
          });
          return [l.min, l.max];
        },
        o = (a) => {
          const l = gt($e(r, a), {
            min: -1 / 0,
            max: 1 / 0,
          });
          return [l.min, l.max];
        };
      return typeof t != "function" && typeof r != "function" ? [n(), o()] : (a) => [n(a), o(a)];
    },
    threshold(s, e, t) {
      return (
        (this.lockDirection = t.axis === "lock"), q.toVector(s, this.lockDirection ? [0.1, 3] : 0)
      );
    },
    modifierKey(s) {
      return s === void 0 ? "ctrlKey" : s;
    },
    pinchOnWheel(s = !0) {
      return s;
    },
  },
);
L(
  L({}, ke),
  {},
  {
    mouseOnly: (s = !0) => s,
  },
);
class ir extends Rt {
  constructor(...e) {
    super(...e), Z(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e),
      this.wheelChange(e),
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const t = this.state;
    (t._delta = $s(e)), q.addTo(t._movement, t._delta), ar(t), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && ((this.state._active = !1), this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const lr = ke;
L(
  L({}, ke),
  {},
  {
    mouseOnly: (s = !0) => s,
  },
);
const et = new Map(),
  Je = new Map();
function ur(s) {
  et.set(s.key, s.engine), Je.set(s.key, s.resolver);
}
const cr = {
    key: "drag",
    engine: Ns,
    resolver: or,
  },
  pr = {
    key: "wheel",
    engine: ir,
    resolver: lr,
  };
function fr(s, e) {
  if (s == null) return {};
  var t = {},
    r = Object.keys(s),
    n,
    o;
  for (o = 0; o < r.length; o++) (n = r[o]), !(e.indexOf(n) >= 0) && (t[n] = s[n]);
  return t;
}
function dr(s, e) {
  if (s == null) return {};
  var t = fr(s, e),
    r,
    n;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(s);
    for (n = 0; n < o.length; n++)
      (r = o[n]),
        !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(s, r) && (t[r] = s[r]);
  }
  return t;
}

function Be(s = {}, e) {
  const t = {};
  for (const [r, n] of Object.entries(e))
    switch (typeof n) {
      case "function":
        t[r] = n.call(t, s[r], r, s);
        break;
      case "object":
        t[r] = Be(s[r], n);
        break;
      case "boolean":
        n && (t[r] = s[r]);
        break;
    }
  return t;
}
function mr(s, e, t = {}) {
  const r = s,
    { target: n, eventOptions: o, window: a, enabled: l, transform: h } = r,
    p = dr(r, hr);
  if (
    ((t.shared = Be(
      {
        target: n,
        eventOptions: o,
        window: a,
        enabled: l,
        transform: h,
      },
      vr,
    )),
    e)
  ) {
    const i = Je.get(e);
    t[e] = Be(
      L(
        {
          shared: t.shared,
        },
        p,
      ),
      i,
    );
  } else
    for (const i in p) {
      const b = Je.get(i);
      b &&
        (t[i] = Be(
          L(
            {
              shared: t.shared,
            },
            p[i],
          ),
          b,
        ));
    }
  return t;
}
class Vt {
  constructor(e, t) {
    Z(this, "_listeners", new Set()), (this._ctrl = e), (this._gestureKey = t);
  }
  add(e, t, r, n, o) {
    const a = this._listeners,
      l = Ms(t, r),
      h = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {},
      p = L(L({}, h), o);
    e.addEventListener(l, n, p);
    const i = () => {
      e.removeEventListener(l, n, p), a.delete(i);
    };
    return a.add(i), i;
  }
  clean() {
    this._listeners.forEach((e) => e()), this._listeners.clear();
  }
}
class _r {
  constructor() {
    Z(this, "_timeouts", new Map());
  }
  add(e, t, r = 140, ...n) {
    this.remove(e), this._timeouts.set(e, window.setTimeout(t, r, ...n));
  }
  remove(e) {
    const t = this._timeouts.get(e);
    t && window.clearTimeout(t);
  }
  clean() {
    this._timeouts.forEach((e) => void window.clearTimeout(e)), this._timeouts.clear();
  }
}
class gr {
  constructor(e) {
    Z(this, "gestures", new Set()),
      Z(this, "_targetEventStore", new Vt(this)),
      Z(this, "gestureEventStores", {}),
      Z(this, "gestureTimeoutStores", {}),
      Z(this, "handlers", {}),
      Z(this, "config", {}),
      Z(this, "pointerIds", new Set()),
      Z(this, "touchIds", new Set()),
      Z(this, "state", {
        shared: {
          shiftKey: !1,
          metaKey: !1,
          ctrlKey: !1,
          altKey: !1,
        },
      }),
      yr(this, e);
  }
  setEventIds(e) {
    if (Ke(e)) return (this.touchIds = new Set(Bs(e))), this.touchIds;
    if ("pointerId" in e)
      return (
        e.type === "pointerup" || e.type === "pointercancel"
          ? this.pointerIds.delete(e.pointerId)
          : e.type === "pointerdown" && this.pointerIds.add(e.pointerId),
        this.pointerIds
      );
  }
  applyHandlers(e, t) {
    (this.handlers = e), (this.nativeHandlers = t);
  }
  applyConfig(e, t) {
    this.config = mr(e, t, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const e of this.gestures)
      this.gestureEventStores[e].clean(), this.gestureTimeoutStores[e].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...e) {
    const t = this.config.shared,
      r = {};
    let n;
    if (!(t.target && ((n = t.target()), !n))) {
      if (t.enabled) {
        for (const a of this.gestures) {
          const l = this.config[a],
            h = Et(r, l.eventOptions, !!n);
          if (l.enabled) {
            const p = et.get(a);
            new p(this, e, a).bind(h);
          }
        }
        const o = Et(r, t.eventOptions, !!n);
        for (const a in this.nativeHandlers)
          o(
            a,
            "",
            (l) =>
              this.nativeHandlers[a](
                L(
                  L({}, this.state.shared),
                  {},
                  {
                    event: l,
                    args: e,
                  },
                ),
              ),
            void 0,
            !0,
          );
      }
      for (const o in r) r[o] = Ws(...r[o]);
      if (!n) return r;
      for (const o in r) {
        const { device: a, capture: l, passive: h } = Is(o);
        this._targetEventStore.add(n, a, "", r[o], {
          capture: l,
          passive: h,
        });
      }
    }
  }
}
function be(s, e) {
  s.gestures.add(e),
    (s.gestureEventStores[e] = new Vt(s, e)),
    (s.gestureTimeoutStores[e] = new _r());
}
function yr(s, e) {
  e.drag && be(s, "drag"),
    e.wheel && be(s, "wheel"),
    e.scroll && be(s, "scroll"),
    e.move && be(s, "move"),
    e.pinch && be(s, "pinch"),
    e.hover && be(s, "hover");
}
const Et =
    (s, e, t) =>
    (r, n, o, a = {}, l = !1) => {
      var h, p;
      const i = (h = a.capture) !== null && h !== void 0 ? h : e.capture,
        b = (p = a.passive) !== null && p !== void 0 ? p : e.passive;
      let _ = l ? r : As(r, n, i);
      t && b && (_ += "Passive"), (s[_] = s[_] || []), s[_].push(o);
    },
  wr = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function br(s) {
  const e = {},
    t = {},
    r = new Set();
  for (const n in s) wr.test(n) ? (r.add(RegExp.lastMatch), (t[n] = s[n])) : (e[n] = s[n]);
  return [t, e, r];
}
function Ee(s, e, t, r, n, o) {
  if (!s.has(t) || !et.has(r)) return;
  const a = t + "Start",
    l = t + "End",
    h = (p) => {
      let i;
      return p.first && a in e && e[a](p), t in e && (i = e[t](p)), p.last && l in e && e[l](p), i;
    };
  (n[r] = h), (o[r] = o[r] || {});
}
function Er(s, e) {
  const [t, r, n] = br(s),
    o = {};
  return (
    Ee(n, t, "onDrag", "drag", o, e),
    Ee(n, t, "onWheel", "wheel", o, e),
    Ee(n, t, "onScroll", "scroll", o, e),
    Ee(n, t, "onPinch", "pinch", o, e),
    Ee(n, t, "onMove", "move", o, e),
    Ee(n, t, "onHover", "hover", o, e),
    {
      handlers: o,
      config: e,
      nativeHandlers: r,
    }
  );
}
function xr(s, e) {
  if (typeof s != "object" || s === null) return s;
  var t = s[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(s, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(s);
}
function kr(s) {
  var e = xr(s, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Tr(s, e, t) {
  return (
    (e = kr(e)),
    e in s
      ? Object.defineProperty(s, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (s[e] = t),
    s
  );
}
function xt(s, e) {
  var t = Object.keys(s);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(s);
    e && (r = r.filter((n) => Object.getOwnPropertyDescriptor(s, n).enumerable)),
      t.push.apply(t, r);
  }
  return t;
}
function Re(s) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? xt(Object(t), !0).forEach((r) => {
          Tr(s, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(t))
        : xt(Object(t)).forEach((r) => {
            Object.defineProperty(s, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return s;
}
class Pr {
  constructor(e, t, r, n, o) {
    (this._target = e),
      (this._gestureKey = n),
      (this._ctrl = new gr(t)),
      this._ctrl.applyHandlers(t, o),
      this._ctrl.applyConfig(
        Re(
          Re({}, r),
          {},
          {
            target: e,
          },
        ),
        n,
      ),
      this._ctrl.effect();
  }
  destroy() {
    this._ctrl.clean();
  }
  setConfig(e) {
    this._ctrl.clean(),
      this._ctrl.applyConfig(
        Re(
          Re({}, e),
          {},
          {
            target: this._target,
          },
        ),
        this._gestureKey,
      ),
      this._ctrl.effect();
  }
}
function Sr(s) {
  return (
    s.forEach(ur),
    (e, t, r) => {
      const { handlers: n, nativeHandlers: o, config: a } = Er(t, r || {});
      return new Pr(e, n, a, void 0, o);
    }
  );
}
const Cr = Sr([cr, pr]),
  Ht = (s, { touchMultiplier: e }) => {
    (s = D(s)), (e = ns(e));
    const t = y([]),
      r = os({
        x: 0,
        y: 0,
      }),
      n = y(null),
      o = y(!1),
      a = y(new as()),
      l = is(),
      h = (k) => {
        a.value.emit("scroll", k);
      },
      p = () => {
        n.value = "wheel";
      },
      i = ({ delta: [k, I], event: W }) => {
        const R = {
          deltaY: -I,
          deltaX: k,
          event: W,
        };
        t.value.push({
          velocity: {
            x: R.deltaX,
            y: R.deltaY,
          },
          time: l.time,
        }),
          h(R);
      },
      b = () => {
        a.value.emit("wheelEnd");
      },
      _ = () => {
        (o.value = !0),
          (n.value = "drag"),
          (t.value = []),
          t.value.push({
            velocity: {
              x: 0,
              y: 0,
            },
            time: l.time,
          }),
          a.value.emit("dragStart");
      },
      j = ({ delta: [k, I], event: W }) => {
        const R = {
          deltaY: I * e.value,
          deltaX: k * e.value,
          event: W,
        };
        t.value.push({
          velocity: {
            x: k,
            y: I,
          },
          time: l.time,
        }),
          h(R);
      },
      Y = () => {
        (o.value = !1),
          t.value.push({
            velocity: {
              x: 0,
              y: 0,
            },
            time: l.time,
          }),
          a.value.emit("dragEnd");
      },
      ee = () => {
        (t.value = t.value.filter((k) => l.time - k.time <= 0.1)),
          t.value.length > 0
            ? ((r.x = t.value.reduce((k, I) => (k += I.velocity.x), 0) / t.value.length),
              (r.y = t.value.reduce((k, I) => (k += I.velocity.y), 0) / t.value.length))
            : (r.x = r.y = 0);
      },
      H = y(
        Cr(
          s,
          {
            onWheelStart: p,
            onWheel: i,
            onWheelEnd: b,
            onDrag: j,
            onDragStart: _,
            onDragEnd: Y,
          },
          {
            drag: {
              preventDefault: !0,
              filterTaps: !0,
              eventOptions: {
                passive: !1,
              },
            },
            wheel: {
              preventDefault: !0,
              eventOptions: {
                passive: !1,
              },
            },
          },
        ),
      ),
      z = (...k) => a.value.on(...k),
      G = (...k) => a.value.on(...k);
    return (
      We(ee),
      He(() => {
        var k, I;
        (k = a.value) == null || k.destroy(), (I = H.value) == null || I.destroy();
      }),
      {
        emitter: a,
        gesture: H,
        velocity: r,
        currentGesture: n,
        dragging: o,
        on: z,
        off: G,
      }
    );
  },
  Or = {
    class: "sides",
  },
  Dr = {
    class: "side-details side",
  },
  Ar = {
    class: "breadcrumb-outer",
  },
  jr = {
    class: "breadcrumb-wrapper",
  },
  Ir = {
    class: "inner",
  },
  Mr = {
    class: "year",
  },
  Lr = {
    class: "description",
  },
  Rr = ["innerHTML"],
  Br = {
    class: "credits-label",
  },
  $r = {
    class: "credits",
  },
  Vr = ["innerHTML"],
  Hr = ["href"],
  Wr = {
    class: "label",
  },
  Kr = {
    class: "icon-wrapper",
  },
  Ur = {
    class: "side-assets side",
  },
  qr = he({
    __name: "ProjectView",
    props: {
      index: {},
      reverse: {
        type: Boolean,
      },
      project: {},
      mainAssetComp: {},
      interfaceComp: {},
      requestClose: {
        type: Function,
      },
    },
    setup(s, { expose: e }) {
      const t = s,
        r = u(null),
        n = u(null),
        o = u([]),
        a = u(null),
        l = u(null),
        h = u(null),
        p = u(null),
        i = u([]),
        b = u([]),
        _ = u([]),
        j = u([]),
        Y = u(),
        ee = u(),
        H = u(),
        z = u(),
        G = Q(() => {
          var c;
          return ((c = t.interfaceComp) == null ? void 0 : c.overscrollUpEl) || null;
        }),
        k = Q(() => {
          var c;
          return ((c = t.interfaceComp) == null ? void 0 : c.overscrollDownEl) || null;
        }),
        I = Q(() => {
          var c;
          return ((c = t.interfaceComp) == null ? void 0 : c.progressWrapperEl) || null;
        }),
        W = Q(() => {
          var c;
          return ((c = t.interfaceComp) == null ? void 0 : c.progressEl) || null;
        }),
        R = Q(() => {
          var c;
          return ((c = t.interfaceComp) == null ? void 0 : c.progressTextEl) || null;
        }),
        K = Ve(),
        C = y(0),
        _e = y(1),
        A = y(null),
        F = {
          drag: 12,
          wheel: 6,
        },
        ne = y(null),
        le = y(!1),
        X = y(0),
        J = y(0),
        g = y(0),
        T = y(0),
        m = y(0),
        w = y(0),
        O = y(0),
        ie = y(0),
        U = y(0),
        P = y({
          min: 0,
          max: 0,
        }),
        ue = y({
          min: 0,
          max: 0,
        }),
        ce = u(!1),
        ge = u(!1),
        Ae = u(!1),
        ve = Q({
          get() {
            return Ae.value && !K.loaderVisible;
          },
          set(c) {
            Ae.value = c;
          },
        }),
        f = Ze(),
        v = y(1),
        M = Q(() => (f.value ? 20 : 10)),
        te = y(null),
        pe = y(null),
        ye = y(null),
        we = Q(() => t.project.assets),
        tt = (c = !1) => {
          var V, B;
          (V = pe.value) == null || V.kill(),
            (B = te.value) == null || B.kill(),
            (te.value = x.timeline({
              onUpdate: je,
            })),
            (ge.value = !0),
            (ce.value = !0),
            (ve.value = !0),
            o.value.forEach((S) => {
              var N;
              return (N = S.media) == null ? void 0 : N.requestMount();
            }),
            Ge(() => {
              o.value.forEach((S) => {
                var N;
                (N = S.media) == null || N.requestLoad();
              });
            }),
            nt(),
            Ut(),
            (J.value = X.value),
            (O.value = T.value = 0);
          const E = te.value;
          return (
            E.to(
              b.value,
              {
                clipPath: `inset(${(100 - (f.value ? 75 : (335 / 375) * 100)) * 0.5}%)`,
                ease: "power4.inOut",
                duration: 1,
              },
              0,
            ),
            E.to(
              v,
              {
                value: f.value ? 0.75 : 335 / 375,
                ease: "power4.inOut",
                duration: 1,
              },
              0,
            ),
            E.to(
              _.value,
              {
                scale: f.value ? 0.75 : 335 / 375,
                ease: "expo.inOut",
                duration: 1.15,
              },
              0,
            ),
            E.call(
              () => {
                var S, N;
                (S = ze.value) == null || S.show(), (N = Ue.value) == null || N.show();
              },
              [],
              c ? 0 : f.value ? 0.6 : 0.25,
            ),
            E.call(
              () => {
                var S, N;
                (S = Ye.value) == null || S.show(), (N = qe.value) == null || N.show();
              },
              [],
              c ? 0 : f.value ? 0.7 : 0.35,
            ),
            E.call(
              () => {
                var S;
                (S = n.value) == null || S.show();
              },
              [],
              "<",
            ),
            E.fromTo(
              [R.value, l.value, h.value],
              {
                yPercent: 100,
                opacity: 0,
              },
              {
                yPercent: 0,
                opacity: 1,
                ease: "expo.out",
                duration: 1,
                stagger: 0.1,
                willChange: "transform",
              },
              "<",
            ),
            E
          );
        },
        Wt = () => {
          var E, V;
          fe == null || fe.kill(),
            (fe = null),
            (E = pe.value) == null || E.kill(),
            (V = te.value) == null || V.kill(),
            (pe.value = x.timeline({
              onUpdate: je,
            })),
            (ce.value = !1),
            (ve.value = !1),
            rt(Math.round(g.value)),
            o.value.forEach((B) => {
              var S;
              return (S = B.media) == null ? void 0 : S.requestPause();
            });
          const c = pe.value;
          return (
            c.to(
              b.value,
              {
                clipPath: "inset(0%)",
                ease: "expo.inOut",
                duration: 1.15,
              },
              0,
            ),
            c.to(
              v,
              {
                value: 1,
                ease: "expo.inOut",
                duration: 1.15,
              },
              0,
            ),
            c.to(
              _.value,
              {
                scale: 1,
                ease: "power4.inOut",
                duration: 1,
              },
              0,
            ),
            c.call(
              () => {
                var B, S;
                (B = ze.value) == null || B.hide(), (S = Ue.value) == null || S.hide();
              },
              [],
              0,
            ),
            c.call(
              () => {
                var B, S;
                (B = Ye.value) == null || B.hide(), (S = qe.value) == null || S.hide();
              },
              [],
              0.1,
            ),
            c.call(
              () => {
                var B;
                (B = n.value) == null || B.hide();
              },
              [],
              0,
            ),
            c.to(
              [R.value, l.value, h.value],
              {
                opacity: 0,
                yPercent: 100,
                ease: "power3.in",
                duration: 0.6,
                stagger: 0,
              },
              0,
            ),
            c.call(
              () => {
                o.value.forEach((B) => {
                  var S;
                  return (S = B.media) == null ? void 0 : S.requestUnmount();
                }),
                  (ge.value = !1);
              },
              [],
              "+=0.2",
            ),
            c
          );
        },
        Kt = () => {
          w.value && (w.value = m.value = X.value = g.value = 0);
        },
        Ut = () => {
          const c = x.timeline({
            paused: !0,
            onUpdate: je,
          });
          return (
            c.to(
              b.value,
              {
                clipPath: "inset(0%)",
                ease: "none",
                duration: 1,
              },
              0,
            ),
            c.to(
              v,
              {
                value: 1,
                ease: "none",
                duration: 1,
              },
              0,
            ),
            c.to(
              _.value,
              {
                scale: 1,
                ease: "none",
                duration: 1,
              },
              0,
            ),
            c.call(
              () => {
                t.requestClose();
              },
              [],
              0.99,
            ),
            (fe = c),
            c
          );
        },
        qt = () => {
          var E;
          (E = ye.value) == null || E.kill(),
            (ye.value = x.timeline()).fromTo(
              W.value,
              {
                y: I.value.offsetHeight - W.value.offsetHeight,
              },
              {
                y: -W.value.offsetHeight * 0.5,
                ease: "none",
                duration: 1,
              },
            );
        },
        Yt = () => {
          A.value = Ht(r.value, {
            touchMultiplier: 1,
          });
          const c = (V) => {
              if (!ve.value) return;
              Te(V.deltaY * 1), (ie.value = Math.sign(V.deltaY) * -1);
            },
            E = () => {
              ve.value && Te(A.value.velocity.y * 20);
            };
          A.value.on("scroll", c), A.value.on("dragEnd", E);
        },
        zt = () => {
          const c = (E) => {
            if (ve.value)
              switch (E.code) {
                case "ArrowUp": {
                  Te(C.value * v.value + M.value);
                  break;
                }
                case "ArrowDown": {
                  Te(-C.value * v.value - M.value);
                  break;
                }
              }
          };
          return (
            document.addEventListener("keydown", c),
            () => {
              document.removeEventListener("keydown", c);
            }
          );
        },
        st = u(0),
        Nt = ({ dt: c }) => {
          var B, S, N, ot, at;
          if (!ge.value && Math.abs(m.value - X.value) < 0.01) {
            i.value.forEach((Ne, de) => {
              de <= 0 || (Ne.style.transform = `translate3d(0, ${C.value}px, 0)`);
            });
            return;
          }
          ne.value === null && (ne.value = (B = A.value) != null && B.dragging ? F.drag : F.wheel),
            (ne.value = Se(
              ne.value,
              (S = A.value) != null && S.dragging.value ? F.drag : F.wheel,
              18,
              c,
            )),
            (O.value = Se(O.value, T.value, ne.value, c)),
            O.value > 0 && (fe == null || fe.progress(O.value)),
            (w.value = Se(w.value, g.value, ne.value, c)),
            (m.value = x.utils.mapRange(0, 1, P.value.min, P.value.max, w.value)),
            (le.value =
              ce.value &&
              !((N = te.value) != null && N.isActive()) &&
              !((ot = pe.value) != null && ot.isActive()) &&
              Math.round(g.value) === g.value &&
              Math.abs(g.value - w.value) < 0.01),
            (U.value = le.value ? (J.value >= 0 ? -1 : 1) : 0),
            (at = ye.value) == null || at.progress(w.value),
            (st.value = (m.value - X.value) * 0.001);
          const E = (C.value - C.value * v.value) * 0.5,
            V = C.value * v.value + M.value;
          i.value.forEach((Ne, de) => {
            var lt, ut;
            let Pe = de * V + m.value;
            de === 0 && Pe < -V - E && (Pe += i.value.length * V);
            const it = Math.max(
              0,
              Math.min(1, x.utils.mapRange(C.value - E, -C.value + E, 0, 1, Pe)),
            );
            de > 0 &&
              (it > 0 && it < 1
                ? (lt = o.value[de - 1].media) == null || lt.requestPlay()
                : (ut = o.value[de - 1].media) == null || ut.requestPause()),
              (Ne.style.transform = `translate3d(0, ${Pe}px, 0)`),
              (j.value[de].style.transform = `translate3d(0, ${-Pe * (1 / v.value) * 0.25}px, 0)`);
          });
        },
        je = () => {
          const c = {
            ...P.value,
          };
          (P.value = {
            min: 0,
            max: -(C.value * v.value + M.value) * i.value.length,
          }),
            (ue.value = {
              min: P.value.min + C.value * _e.value,
              max: P.value.max - C.value * _e.value,
            }),
            Te((P.value.max - c.max) * g.value);
        },
        Gt = () => {
          X.value = Math.min(P.value.min, Math.max(P.value.max, X.value));
        },
        Ft = () => {
          J.value = Math.min(ue.value.min, Math.max(ue.value.max, J.value));
        },
        Te = (c) => {
          (X.value += c),
            Gt(),
            (g.value = x.utils.mapRange(P.value.min, P.value.max, 0, 1, X.value)),
            le.value ? ((J.value += c), Ft()) : (J.value = X.value),
            (T.value =
              Math.max(0, x.utils.mapRange(P.value.min, ue.value.min, 0, 1, J.value)) +
              Math.max(0, x.utils.mapRange(P.value.max, ue.value.max, 0, 1, J.value))),
            T.value > 0 && rt(Math.round(g.value));
        },
        rt = (c) => {
          (g.value = c), (X.value = x.utils.mapRange(0, 1, P.value.min, P.value.max, g.value));
        },
        nt = () => {
          (C.value = p.value.offsetHeight),
            je(),
            Ge(() => {
              qt();
            });
        },
        Xt = (c) => {
          const E = c === 1 ? k.value : G.value;
          x.timeline().to(E, {
            yPercent: 0,
            opacity: 1,
            ease: "expo.out",
            duration: 1,
            willChange: "transform",
            overwrite: "auto",
          });
        },
        Jt = (c) => {
          const E = c === 1 ? k.value : G.value;
          x.timeline().to(E, {
            yPercent: 100 * c,
            opacity: 0,
            ease: "power3.in",
            duration: 0.4,
            overwrite: "auto",
          });
        },
        Ue = y(),
        qe = y(),
        Ye = y(),
        ze = y();
      let fe = null;
      const Ie = y(!0);
      return (
        Ce(() => {
          ds(
            a.value,
            {},
            () => {
              Ie.value = !1;
            },
            () => {
              Ie.value = !0;
            },
          ),
            ae(Ie, () => {
              Ie.value ? (K.cursorText = "Close") : (K.cursorText = null);
            }),
            (Ue.value = Le(Y)),
            (qe.value = Le(ee)),
            (Ye.value = Le(z)),
            (ze.value = Le(H)),
            Yt();
          const c = zt();
          Ge(() => {
            (i.value = [t.mainAssetComp.wrapper2El, ...p.value.querySelectorAll(".wrapper-2")]),
              (b.value = i.value.map((E) => E.querySelector(".wrapper-3"))),
              (_.value = i.value.map((E) => E.querySelector(".wrapper-4"))),
              (j.value = i.value.map((E) => E.querySelector(".wrapper-5")));
          }),
            Qe(nt, void 0, !0),
            We(Nt),
            x.set(p.value, {
              opacity: 1,
              lazy: !0,
            }),
            ae(
              U,
              (E, V) => {
                V !== 0 && V !== void 0 && Jt(V), E !== 0 && Xt(E);
              },
              {
                immediate: !0,
              },
            ),
            He(() => {
              c();
            });
        }),
        e({
          enter: tt,
          leave: Wt,
          goToTop: Kt,
          velocity: st,
          currentScrollProgress: w,
          currentOverscrollProgress: O,
        }),
        (c, E) => {
          const V = ls,
            B = Xe;
          return (
            se(),
            re(
              "div",
              {
                ref_key: "el",
                ref: r,
                class: Oe([
                  "project-view",
                  {
                    reversed: t.reverse,
                    active: D(ce),
                    visible: D(ge),
                  },
                ]),
              },
              [
                d("div", Or, [
                  d("div", Dr, [
                    d("div", Ar, [
                      d("div", jr, [
                        $(
                          V,
                          {
                            ref_key: "breadcrumbComp",
                            ref: n,
                            items: [
                              {
                                title: "index",
                                route: {
                                  name: "index",
                                },
                              },
                              {
                                title: t.project.title,
                                route: {
                                  name: "slug",
                                  params: {
                                    slug: t.project.slug,
                                  },
                                },
                              },
                            ],
                          },
                          null,
                          8,
                          ["items"],
                        ),
                      ]),
                    ]),
                    d("div", Ir, [
                      d("div", Mr, [
                        d(
                          "p",
                          {
                            ref_key: "yearEl",
                            ref: H,
                          },
                          "S",
                          512,
                        ),
                      ]),
                      d("div", Lr, [
                        d(
                          "p",
                          {
                            ref_key: "descriptionEl",
                            ref: Y,
                            innerHTML: t.project.description,
                          },
                          null,
                          8,
                          Rr,
                        ),
                      ]),
                      d("div", Br, [
                        d(
                          "p",
                          {
                            ref_key: "creditsLabelEl",
                            ref: z,
                          },
                          "C",
                          512,
                        ),
                      ]),
                      d("div", $r, [
                        d(
                          "p",
                          {
                            ref_key: "creditsEl",
                            ref: ee,
                            innerHTML: t.project.credits,
                          },
                          null,
                          8,
                          Vr,
                        ),
                      ]),
                    ]),
                    d(
                      "a",
                      {
                        ref_key: "visitLinkEl",
                        ref: a,
                        class: "visit",
                        href: t.project.link,
                        target: "_blank",
                        onClick: E[0] || (E[0] = Pt(() => {}, ["stop"])),
                      },
                      [
                        d("div", Wr, [
                          d(
                            "span",
                            {
                              ref_key: "visitEl",
                              ref: l,
                            },
                            "Visit site",
                            512,
                          ),
                        ]),
                        d("div", Kr, [
                          d(
                            "div",
                            {
                              ref_key: "iconEl",
                              ref: h,
                              class: "svg-wrapper",
                            },
                            [$(D(jt))],
                            512,
                          ),
                        ]),
                      ],
                      8,
                      Hr,
                    ),
                  ]),
                  d("div", Ur, [
                    d(
                      "ul",
                      {
                        ref_key: "assetsListEl",
                        ref: p,
                        class: "assets-list",
                      },
                      [
                        (se(!0),
                        re(
                          St,
                          null,
                          Ct(
                            D(we),
                            (S, N) => (
                              se(),
                              re(
                                "li",
                                {
                                  key: N,
                                  class: "asset-item",
                                },
                                [
                                  $(
                                    B,
                                    {
                                      ref_for: !0,
                                      ref_key: "projectThumbComps",
                                      ref: o,
                                      asset: S,
                                      "with-background": "",
                                      spacing: "medium",
                                      lazy: "",
                                    },
                                    null,
                                    8,
                                    ["asset"],
                                  ),
                                ],
                              )
                            ),
                          ),
                          128,
                        )),
                      ],
                      512,
                    ),
                  ]),
                ]),
              ],
              2,
            )
          );
        }
      );
    },
  }),
  Yr = me(qr, [["__scopeId", "data-v-0b956f70"]]),
  zr = {
    class: "overscroll up",
  },
  Nr = {
    class: "overscroll down",
  },
  Gr = he({
    __name: "ProjectInterface",
    props: {
      reverse: {
        type: Boolean,
      },
      viewComp: {},
    },
    setup(s, { expose: e }) {
      Ot((p) => ({
        "29add134": D(h),
      }));
      const t = s,
        r = u(null),
        n = u(null),
        o = u(null),
        a = u(null),
        l = u(null);
      Ce(() => {
        x.set(n.value, {
          yPercent: 100,
        }),
          x.set(r.value, {
            yPercent: -100,
          });
      });
      const h = Q(() => {
        var p;
        return ((p = t.viewComp) == null ? void 0 : p.currentOverscrollProgress) || 0;
      });
      return (
        e({
          overscrollUpEl: r,
          overscrollDownEl: n,
          progressWrapperEl: o,
          progressEl: a,
          progressTextEl: l,
        }),
        (p, i) => {
          var b;
          return (
            se(),
            re(
              "div",
              {
                class: Oe([
                  "project-interface",
                  {
                    reversed: t.reverse,
                  },
                ]),
              },
              [
                d("div", zr, [
                  d(
                    "span",
                    {
                      ref_key: "overscrollUpEl",
                      ref: r,
                    },
                    "Scroll up to close",
                    512,
                  ),
                ]),
                d("div", Nr, [
                  d(
                    "span",
                    {
                      ref_key: "overscrollDownEl",
                      ref: n,
                    },
                    "Scroll down to close",
                    512,
                  ),
                ]),
                d(
                  "div",
                  {
                    ref_key: "progressWrapperEl",
                    ref: o,
                    class: "progress",
                  },
                  [
                    d(
                      "span",
                      {
                        ref_key: "progressEl",
                        ref: a,
                      },
                      [
                        d(
                          "span",
                          {
                            ref_key: "progressTextEl",
                            ref: l,
                            class: "progress-text",
                          },
                          us(
                            `${Math.round((((b = t.viewComp) == null ? void 0 : b.currentScrollProgress) || 0) * 100)}`.padStart(
                              2,
                              "0",
                            ),
                          ) + "%",
                          513,
                        ),
                      ],
                      512,
                    ),
                  ],
                  512,
                ),
              ],
              2,
            )
          );
        }
      );
    },
  }),
  Fr = me(Gr, [["__scopeId", "data-v-2b3c5178"]]),
  Xr = he({
    __name: "Project",
    props: {
      project: {},
      reverse: {
        type: Boolean,
      },
      count: {},
      index: {},
      direction: {},
    },
    setup(s, { expose: e }) {
      Ot((f) => ({
        "6ca40546": D(_e),
      }));
      const t = s,
        r = u(null),
        n = u(null),
        o = y(null),
        a = y(0),
        l = u(null),
        h = u(null),
        p = u(null),
        i = u(null),
        b = u(null),
        _ = u(null),
        j = u(null),
        Y = u(null),
        ee = u(null),
        H = u(null),
        z = u(null),
        G = u(null),
        k = u(!1),
        I = u(0),
        W = u(0),
        R = u(!1),
        K = Ze(),
        C = y(null),
        _e = Q(() => t.count - t.index),
        A = Ve(),
        F = u(!1),
        ne = u(!1),
        le = Q(() => {
          var f;
          return ((f = A.currentWork) == null ? void 0 : f.id) === t.project.id;
        }),
        X = kt(),
        J = u(!1),
        g = Q(() => {
          var f;
          return ((f = r.value) == null ? void 0 : f.velocity) || 0;
        });
      let T = null;
      const m = (f = !1) => {
          const v = (T = x.timeline());
          return (
            J.value ||
              ((J.value = !0),
              A.addActiveWork(t.project),
              f &&
                !k.value &&
                (v.fromTo(
                  i.value,
                  {
                    clipPath: "inset(50%)",
                    opacity: 1,
                  },
                  {
                    clipPath: "inset(0%)",
                    opacity: 1,
                    ease: "expo.inOut",
                    duration: 1.15,
                  },
                  0,
                ),
                v.fromTo(
                  b.value,
                  {
                    scale: 0,
                  },
                  {
                    scale: 1,
                    ease: "power4.inOut",
                    duration: 1,
                  },
                  0,
                )),
              v.to(
                I,
                {
                  value: 0.5,
                  duration: 1.4,
                  ease: "custom.expoOut",
                  overwrite: "auto",
                },
                0,
              ),
              k.value ||
                v.to(
                  W,
                  {
                    value: 0.5,
                    duration: 1.4,
                    ease: "custom.expoOut",
                    overwrite: "auto",
                  },
                  0.1,
                )),
            v
          );
        },
        w = () => {
          const f = x.timeline();
          if (!J.value) return f;
          J.value = !1;
          const v = K.value
            ? 0
            : (((T == null ? void 0 : T.duration()) || 0) -
                ((T == null ? void 0 : T.time()) || 0)) *
              0.5;
          f.to(
            I,
            {
              value: 1,
              duration: 0.6,
              ease: "power2.in",
              overwrite: "auto",
              onComplete: () => {
                I.value = 0;
              },
            },
            v,
          ),
            f.to(
              W,
              {
                value: 1,
                duration: 0.6,
                ease: "power2.in",
                overwrite: "auto",
                onComplete: () => {
                  W.value = 0;
                },
              },
              v + 0.1,
            ),
            f.call(() => {
              A.removeActiveWork(t.project);
            });
        },
        O = () => {
          le.value ? A.setCurrentWork(null) : A.setCurrentWork(t.project);
        },
        ie = () => {
          le.value && A.setCurrentWork(null);
        };
      let U = null,
        P = null;
      const ue = (f = !1) => {
          (k.value = !0),
            X.push({
              name: "slug",
              params: {
                slug: t.project.slug,
              },
            }),
            P == null || P.kill(),
            U == null || U.kill(),
            (U = x.timeline());
          const v = U;
          v.to(
            i.value,
            {
              clipPath: "inset(50%)",
              ease: "power4.inOut",
              duration: f ? 0 : 0.9,
              overwrite: "auto",
            },
            0,
          ),
            v.to(
              b.value,
              {
                scale: 0,
                willChange: "transform",
                ease: "expo.inOut",
                duration: f ? 0 : 0.9,
                overwrite: "auto",
              },
              0,
            ),
            x.killTweensOf(W),
            v.to(
              W,
              {
                value: 0,
                duration: 0.6,
                ease: "power2.in",
                overwrite: "auto",
              },
              0,
            ),
            v.add(r.value.enter(f), 0);
        },
        ce = () => {
          X.push({
            name: "slug",
            params: {
              slug: "",
            },
          }),
            P == null || P.kill(),
            U == null || U.kill(),
            (P = x.timeline());
          const f = P;
          f.add(r.value.leave(), 0),
            f.to(
              i.value,
              {
                clipPath: "inset(0%)",
                ease: "expo.inOut",
                duration: 1,
                overwrite: "auto",
              },
              K.value ? 0.1 : 0,
            ),
            f.to(
              b.value,
              {
                scale: 1,
                ease: "power4.inOut",
                duration: 0.9,
                overwrite: "auto",
              },
              K.value ? 0.1 : 0,
            ),
            f.to(
              W,
              {
                value: 0.5,
                duration: 1.4,
                ease: "custom.expoOut",
                overwrite: "auto",
              },
              0.15,
            ),
            f.call(() => {
              k.value = !1;
            });
        };
      Ce(() => {
        (C.value = x.quickSetter(l.value, "zIndex")),
          Qe(Ae),
          We(ge, 250),
          ae(K, (f, v) => {
            v !== f && ie();
          }),
          ae(
            [() => A.currentWork, () => A.loaded],
            ([f, v], [M, te]) => {
              (f == null ? void 0 : f.id) === t.project.id && v
                ? ue(v && !te)
                : (M == null ? void 0 : M.id) === t.project.id && f === null && ce();
            },
            {
              immediate: !0,
            },
          ),
          ae(
            [ne, () => A.hasActiveWorks, () => A.loaded, K],
            ([f, v, M, te], [pe, ye, we, tt]) => {
              if (te) {
                if (f && M) {
                  m(M && !we);
                  return;
                }
                w();
                return;
              }
              if (f && !v && M) {
                m(M && !we);
                return;
              }
              f || w();
            },
            {
              immediate: !0,
            },
          ),
          ae(F, (f, v) => {
            var M;
            !v && f && ((M = r.value) == null || M.goToTop());
          }),
          ae(
            [R, () => A.hasCurrentWork],
            ([f, v], [M]) => {
              f && !v ? (A.cursorText = "Open") : M && (A.cursorText = null),
                f && v && (A.cursorText = "Close");
            },
            {
              immediate: !0,
            },
          ),
          At(() => {
            x.set([i.value, j.value], {
              opacity: 1,
            });
          });
      });
      const ge = () => {
          var f, v, M, te;
          a.value > 0 && a.value < 1
            ? (K.value && ((f = C.value) == null || f.call(C, 1)), (F.value = !0))
            : K.value && ((v = C.value) == null || v.call(C, 0), (F.value = !1)),
            (M = o.value) == null || M.progress(a.value),
            (ne.value = K.value
              ? a.value >= 0.49 && a.value < 0.9
              : a.value >= 0.25 && a.value < 0.75),
            K.value || (te = C.value) == null || te.call(C, ne.value ? 1 : 0);
        },
        Ae = () => {
          ve();
        };
      function ve() {
        var f;
        (f = o.value) == null || f.revert(),
          (o.value = x.timeline({
            paused: !0,
          })),
          o.value.progress(1),
          o.value.progress(0),
          K.value
            ? (o.value.fromTo(
                l.value,
                {
                  yPercent: 100,
                },
                {
                  yPercent: 0,
                  duration: 0.5,
                  ease: "none",
                },
                0,
              ),
              o.value.fromTo(
                p.value,
                {
                  yPercent: 0,
                },
                {
                  yPercent: 0,
                  duration: 0.5,
                  ease: "none",
                },
                0,
              ),
              o.value.fromTo(
                H.value,
                {
                  yPercent: -50,
                },
                {
                  yPercent: 0,
                  duration: 0.5,
                  ease: "none",
                },
                0,
              ),
              o.value.to(
                l.value,
                {
                  yPercent: -100,
                  duration: 0.5,
                  ease: "none",
                },
                0.5,
              ),
              o.value.to(
                H.value,
                {
                  yPercent: 50,
                  duration: 0.5,
                  ease: "none",
                },
                0.5,
              ))
            : (o.value.fromTo(
                H.value,
                {
                  yPercent: 100,
                },
                {
                  yPercent: 0,
                  duration: 0.5,
                  ease: "none",
                },
                0,
              ),
              o.value.fromTo(
                z.value,
                {
                  yPercent: -50,
                },
                {
                  yPercent: 0,
                  duration: 0.5,
                  ease: "none",
                },
                0,
              ),
              o.value.to(
                H.value,
                {
                  yPercent: -100,
                  duration: 0.5,
                  ease: "none",
                },
                0.5,
              ),
              o.value.to(
                z.value,
                {
                  yPercent: 50,
                  duration: 0.5,
                  ease: "none",
                },
                0.5,
              ));
      }
      return (
        e({
          el: l,
          progress: a,
          requestToggle: O,
          isCurrentWork: le,
        }),
        (f, v) => {
          const M = vs,
            te = Tt,
            pe = Yr,
            ye = Fr;
          return (
            se(),
            re(
              "div",
              {
                ref_key: "el",
                ref: l,
                class: Oe([
                  "project",
                  {
                    reversed: t.reverse,
                    visible: D(F),
                  },
                ]),
                onClick: O,
                onMouseenter: v[1] || (v[1] = (we) => (R.value = !0)),
                onMouseleave: v[2] || (v[2] = (we) => (R.value = !1)),
              },
              [
                d(
                  "div",
                  {
                    ref_key: "sidesEl",
                    ref: h,
                    class: "sides",
                  },
                  [
                    d(
                      "div",
                      {
                        ref_key: "sideMainEl",
                        ref: p,
                        class: "side side-main",
                      },
                      [
                        d(
                          "div",
                          {
                            ref_key: "mainMediaWrapperEl",
                            ref: i,
                            class: "main-media-wrapper",
                          },
                          [
                            d(
                              "div",
                              {
                                ref_key: "mainMediaWrapper2El",
                                ref: b,
                                class: "main-media-wrapper-2",
                              },
                              [
                                $(
                                  D(Xe),
                                  {
                                    asset: t.project.mainAsset,
                                    lazy: !1,
                                    "with-background": "",
                                    spacing: "large",
                                    unwrap: "",
                                  },
                                  null,
                                  8,
                                  ["asset"],
                                ),
                              ],
                              512,
                            ),
                          ],
                          512,
                        ),
                        d(
                          "div",
                          {
                            ref_key: "metasWrapperEl",
                            ref: _,
                            class: "metas-wrapper",
                          },
                          [
                            d(
                              "div",
                              {
                                ref_key: "titleEl",
                                ref: Y,
                                class: "title",
                              },
                              [
                                $(
                                  te,
                                  {
                                    to: {
                                      name: "slug",
                                      params: {
                                        slug: t.project.slug,
                                      },
                                    },
                                    "aria-label": t.project.title,
                                    onClick: v[0] || (v[0] = Pt(() => {}, ["prevent"])),
                                  },
                                  {
                                    default: xe(() => [
                                      $(
                                        M,
                                        {
                                          text: t.project.title,
                                          visible: D(F),
                                          progress: D(I),
                                          velocity: D(g),
                                        },
                                        null,
                                        8,
                                        ["text", "visible", "progress", "velocity"],
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["to", "aria-label"],
                                ),
                              ],
                              512,
                            ),
                            d(
                              "div",
                              {
                                ref_key: "indexEl",
                                ref: ee,
                                class: "index",
                              },
                              [
                                $(
                                  M,
                                  {
                                    text: `${t.index + 1}`.padStart(2, "0"),
                                    visible: D(F),
                                    progress: D(W),
                                    velocity: D(g),
                                  },
                                  null,
                                  8,
                                  ["text", "visible", "progress", "velocity"],
                                ),
                              ],
                              512,
                            ),
                          ],
                          512,
                        ),
                      ],
                      512,
                    ),
                    d(
                      "div",
                      {
                        ref_key: "sideThumbEl",
                        ref: j,
                        class: "side side-thumb",
                      },
                      [
                        d(
                          "div",
                          {
                            ref_key: "wrapper1El",
                            ref: H,
                            class: "wrapper wrapper-1",
                          },
                          [
                            d(
                              "div",
                              {
                                ref_key: "wrapper2El",
                                ref: z,
                                class: "wrapper wrapper-2",
                              },
                              [
                                $(
                                  D(Xe),
                                  {
                                    ref_key: "thumbComp",
                                    ref: G,
                                    asset: t.project.thumbnail,
                                    class: "main-thumb",
                                  },
                                  null,
                                  8,
                                  ["asset"],
                                ),
                              ],
                              512,
                            ),
                          ],
                          512,
                        ),
                      ],
                      512,
                    ),
                  ],
                  512,
                ),
                $(
                  pe,
                  {
                    ref_key: "viewComp",
                    ref: r,
                    project: t.project,
                    index: t.index,
                    "main-asset-comp": D(G),
                    reverse: t.reverse,
                    "request-close": ie,
                    "interface-comp": D(n),
                  },
                  null,
                  8,
                  ["project", "index", "main-asset-comp", "reverse", "interface-comp"],
                ),
                $(
                  ye,
                  {
                    ref_key: "interfaceComp",
                    ref: n,
                    "view-comp": D(r),
                    reverse: t.reverse,
                  },
                  null,
                  8,
                  ["view-comp", "reverse"],
                ),
              ],
              34,
            )
          );
        }
      );
    },
  }),
  Jr = me(Xr, [["__scopeId", "data-v-a7359af5"]]),
  Zr = {
    class: "projects-list",
  },
  Qr = {
    class: "project-wrapper",
  },
  en = he({
    __name: "Projects",
    setup(s) {
      const e = Ve(),
        t = y(0),
        r = y(0),
        n = y(0),
        o = u(!1),
        a = u([]),
        l = u(null),
        h = u(null),
        p = u(null),
        i = u(null),
        b = Ze(),
        _ = y(0),
        j = y(null),
        Y = {
          drag: 12,
          wheel: 6,
        },
        ee = u(!1),
        H = y(1),
        z = u(!0),
        G = y(null),
        k = Q(() => e.inAbout),
        I = Q(() => !e.hasCurrentWork && !e.loaderVisible && e.loaded),
        W = () => {
          j.value = Ht(l.value, {
            touchMultiplier: H,
          });
          const g = (w) => {
              if (((ee.value = !1), !I.value || ((z.value = !1), e.hasCurrentWork))) return;
              o.value = !0;
              const O = 1;
              (t.value = t.value + w.deltaY * O), (n.value = Math.sign(w.deltaY) * -1), K();
            },
            T = () => {
              e.hasCurrentWork || ((t.value = t.value + j.value.velocity.y * 20), C());
            },
            m = () => {
              K();
            };
          j.value.on("scroll", g), j.value.on("dragEnd", T), j.value.on("wheelEnd", m);
        },
        R = () => {
          const g = (T) => {
            var w, O, ie, U, P;
            const m = A(x.utils.snap(_.value, t.value) / -_.value);
            switch (T.code) {
              case "ArrowUp": {
                if (!I.value) return;
                F(A(m - 1));
                break;
              }
              case "ArrowDown": {
                if (!I.value) return;
                F(A(m + 1));
                break;
              }
              case "Space": {
                (w = a.value[m]) == null || w.requestToggle();
                break;
              }
              case "ArrowRight": {
                if ((O = a.value[m]) != null && O.isCurrentWork) return;
                (ie = a.value[m]) == null || ie.requestToggle();
                break;
              }
              case "ArrowLeft":
              case "Escape": {
                if (!((U = a.value[m]) != null && U.isCurrentWork)) return;
                (P = a.value[m]) == null || P.requestToggle();
                break;
              }
            }
          };
          return (
            document.addEventListener("keydown", g),
            () => {
              document.removeEventListener("keydown", g);
            }
          );
        },
        K = cs(450, () => {
          var g;
          ((g = j.value) != null && g.dragging.value) || C();
        }),
        C = () => {
          var g, T;
          if (
            ((ee.value = !0), ((g = j.value) == null ? void 0 : g.currentGesture.value) === "wheel")
          ) {
            const m = x.to(t, {
                value: x.utils.snap(_.value, t.value),
                ease: "power1.in",
                duration: 0.2,
              }),
              w = () => {
                var O;
                m.kill(), (O = j.value) == null || O.off("scroll", w);
              };
            (T = j.value) == null || T.on("scroll", w);
            return;
          }
          t.value = x.utils.snap(_.value, t.value);
        },
        _e = (g, T, m) => {
          let w = (T - g) % m;
          w < 0 && (w += m);
          let O = (g - T) % m;
          return O < 0 && (O += m), w <= O ? w : -O;
        },
        A = (g) => x.utils.wrap(0, Me.length, g),
        F = (g, T = !1) => {
          const m = t.value,
            w = _e(-m, g * _.value, _.value * Me.length);
          (t.value -= w), T && (r.value = t.value);
        },
        ne = ({ dt: g }) => {
          var T, m;
          G.value === null && (G.value = (T = j.value) != null && T.dragging ? Y.drag : Y.wheel),
            (G.value = Se(
              G.value,
              (m = j.value) != null && m.dragging.value ? Y.drag : Y.wheel,
              10,
              g,
            )),
            (r.value = Se(r.value, t.value, G.value, g)),
            a.value.forEach((w, O) => {
              const ie = _.value * O,
                U = ie - _.value,
                P = ie + _.value,
                ue = x.utils.wrap(U, P + _.value * (a.value.length - 1) - _.value, -r.value),
                ce = ps(ue, U, P, 0, 1);
              w.progress = ce;
            });
        },
        le = () => {
          const g = _.value || l.value.offsetHeight;
          (_.value = l.value.offsetHeight),
            (t.value = (_.value / g) * t.value),
            C(),
            (r.value = t.value);
        },
        X = () => {
          x.to(l.value, {
            yPercent: 25,
            scale: 1.3,
            ease: "expo.inOut",
            duration: 1,
          });
        },
        J = () => {
          x.to(l.value, {
            yPercent: 0,
            scale: 1,
            ease: "expo.inOut",
            duration: 1,
          });
        };
      return (
        Ce(() => {
          W();
          const g = R();
          We(ne),
            Qe(le, void 0, !0),
            At(() => {
              x.effects.textReveal([p.value, i.value], {
                mode: "enter",
              });
            }),
            ae(
              b,
              (m) => {
                H.value = m ? 1 : 3;
              },
              {
                immediate: !0,
              },
            ),
            ae(z, (m) => {
              if (!m) {
                const w = x.timeline();
                w.textReveal([p.value, i.value], {
                  mode: "leave",
                }),
                  w.set(h.value, {
                    display: "none",
                  });
              }
            });
          let T = !0;
          ae(
            () => e.currentWorkIndex,
            (m) => {
              const w = T;
              (T = !1), m !== null && ((z.value = !1), F(m, w));
            },
            {
              immediate: !0,
            },
          ),
            ae(
              k,
              (m, w) => {
                m ? X() : w && J();
              },
              {
                immediate: !0,
              },
            ),
            He(() => {
              g();
            });
        }),
        (g, T) => {
          const m = Jr;
          return (
            se(),
            re(
              "div",
              {
                ref_key: "el",
                ref: l,
                class: Oe([
                  "projects",
                  {
                    loaded: D(e).loaded,
                  },
                ]),
              },
              [
                d("ul", Zr, [
                  (se(!0),
                  re(
                    St,
                    null,
                    Ct(
                      D(Me),
                      (w, O) => (
                        se(),
                        re(
                          "li",
                          {
                            key: w.id,
                          },
                          [
                            d("div", Qr, [
                              $(
                                m,
                                {
                                  ref_for: !0,
                                  ref_key: "projectsComp",
                                  ref: a,
                                  project: w,
                                  reverse: O % 2 === 1,
                                  progress: 0,
                                  index: O,
                                  count: D(Me).length,
                                  direction: D(n),
                                },
                                null,
                                8,
                                ["project", "reverse", "index", "count", "direction"],
                              ),
                            ]),
                          ],
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
                d(
                  "div",
                  {
                    ref_key: "scrollTipEl",
                    ref: h,
                    class: "mobile-scroll-tip",
                  },
                  [
                    d(
                      "div",
                      {
                        ref_key: "scrollTipTextEl",
                        ref: p,
                        class: "text",
                      },
                      "Scroll down",
                      512,
                    ),
                    d(
                      "div",
                      {
                        ref_key: "scrollTipIconEl",
                        ref: i,
                        class: "icon-wrapper",
                      },
                      [$(D(jt))],
                      512,
                    ),
                  ],
                  512,
                ),
              ],
              2,
            )
          );
        }
      );
    },
  }),
  tn = me(en, [["__scopeId", "data-v-8e77e267"]]),
  sn = he({
    __name: "PageTransitionsManager",
    setup(s) {
      return hs(), (e, t) => Dt(e.$slots, "default");
    },
  }),
  rn = {},
  nn = {
    class: "layout layout--default",
  },
  on = {
    class: "header-wrapper",
  };
function an(s, e) {
  const t = bs,
    r = tn,
    n = sn;
  return (
    se(),
    re("div", nn, [
      d("div", on, [$(t)]),
      $(r),
      $(n, null, {
        default: xe(() => [Dt(s.$slots, "default", {}, void 0, !0)]),
        _: 3,
      }),
    ])
  );
}
const fn = me(rn, [
  ["render", an],
  ["__scopeId", "data-v-1a7c8294"],
]);
export { fn as default };
