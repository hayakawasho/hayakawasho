const h =
    '\nvarying vec3 vUv;\n\nvoid main() {\n  vUv = position;\n\n  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);\n  gl_Position = projectionMatrix * modelViewPosition;\n}\n',
  v =
    '\n#define M_PI 3.1415926535897932384626433832795\n\nuniform float thetaStart;\nuniform float gapLength;\nuniform float thetaLength;\nuniform float imagesCount;\nuniform float cylinderRadius;\nuniform float cylinderHeight;\nuniform float frameWidth;\nuniform float imageWidth;\nuniform sampler2D imageBackground;\n\nvarying vec3 vUv;\n\nvoid main() {\n  float angle = atan(vUv.x / cylinderRadius, vUv.z / cylinderRadius) + M_PI;\n  float theta = thetaStart;\n\n  float realAngle = mix(thetaStart - gapLength * 0.5, thetaStart + thetaLength + gapLength * 0.5, (angle - M_PI - thetaStart) / thetaLength)\n  + gapLength * 0.5;\n\n  vec2 uv = vec2(\n    1.0 - (vUv.y + cylinderHeight * 0.5) / cylinderHeight, // 1.0 - (vUv.y + cylinderHeight * 0.5) / cylinderHeight,\n    1.0 - mod(imagesCount * (realAngle / (M_PI * 2.0)), 1.0)\n  );\n\n  vec2 fittedUv = vec2(uv.x, uv.y);\n\n  float width = imageWidth / frameWidth;\n  if (width < 1.0) {\n    float uvY = uv.y * width;\n    fittedUv = vec2(uv.x, uvY + (1.0 - width) * 0.5);\n  } else {\n    float uvX = uv.x / width;\n    fittedUv = vec2(uvX + (width - 1.0) * 0.5, uv.y);\n  }\n\n  gl_FragColor = texture2D(imageBackground, fittedUv);\n}\n',
  y = function () {
    function e(t, n, r) {
      const c = this;
      Object(o.a)(this, e),
        (this.onResize = function () {
          (c.ww = window.innerWidth),
            (c.wh = c.sizerEl.clientHeight || window.innerHeight),
            (c.camera.aspect = c.ww / c.wh),
            c.camera.updateProjectionMatrix(),
            c.renderer.setSize(c.ww, c.wh),
            c.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }),
        (this.cylinderGroup = new l.c()),
        (this.sizerEl = n),
        (this.animate = !1),
        (this.verticalCylinder = !0),
        (this.scrollProgress = 0),
        (this.mousePos = {
          x: 0,
          y: 0,
        }),
        (this.lerpedMouseRotationY = 0),
        (this.images = r),
        this.images.push('/images/transparent.png'),
        (this.ww = window.innerWidth),
        (this.wh = this.sizerEl.clientHeight || window.innerHeight),
        (this.cylinderSize = (4 * this.ww) / this.wh),
        (this.scene = new l.g()),
        this.initializeCylinder(),
        (this.camera = new l.f(35, this.ww / this.wh, 0.1, 100)),
        (this.camera.position.z = this.ww / this.wh > 1 ? 3 : 5),
        this.scene.add(this.camera),
        (this.renderer = new l.j({
          antialias: !0,
          canvas: t,
          precision: 'highp',
        })),
        this.renderer.setSize(this.ww, this.wh),
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
        this.renderer.setClearColor(16777215, 0),
        (this.tick = this.tick.bind(this)),
        this.tick();
    }
    let t;
    return (
      Object(c.a)(e, [
        {
          key: 'initializeCylinder',
          value:
            ((t = Object(r.a)(
              regeneratorRuntime.mark(function e() {
                let t,
                  n,
                  r,
                  o,
                  c,
                  d,
                  y,
                  m,
                  j,
                  x,
                  O,
                  w,
                  R,
                  k = this;
                return regeneratorRuntime.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2),
                            Promise.all(
                              this.images.map(function (e) {
                                return k.loadTexture(e);
                              })
                            )
                          );
                        case 2:
                          (t = e.sent),
                            (n = 0.12),
                            (r = this.cylinderSize),
                            (o = this.cylinderSize),
                            (c = (2 * Math.PI) / this.images.length - n),
                            (d = 0),
                            (y = f(t));
                          try {
                            for (y.s(); !(m = y.n()).done; )
                              ((j = m.value).minFilter = l.d),
                                (x = d * c + d * n - Math.PI),
                                (O = new l.b(r, r, o, 64, 1, !0, x, c)),
                                (w = new l.h({
                                  fragmentShader: v,
                                  side: l.a,
                                  uniforms: {
                                    cylinderHeight: {
                                      value: o,
                                    },
                                    cylinderRadius: {
                                      value: r,
                                    },
                                    frameWidth: {
                                      value: o / ((2 * Math.PI * r) / t.length),
                                    },
                                    gapLength: {
                                      value: n,
                                    },
                                    imageBackground: {
                                      value: j,
                                    },
                                    imageWidth: {
                                      value: j.image.width / j.image.height,
                                    },
                                    imagesCount: {
                                      value: t.length,
                                    },
                                    thetaLength: {
                                      value: c,
                                    },
                                    thetaStart: {
                                      value: x,
                                    },
                                  },
                                  vertexShader: h,
                                })),
                                (R = new l.e(O, w)),
                                this.cylinderGroup.add(R),
                                (d += 1);
                          } catch (e) {
                            y.e(e);
                          } finally {
                            y.f();
                          }
                          this.cylinderGroup.rotation.reorder('ZXY'),
                            (this.cylinderGroup.rotation.z =
                              this.ww / this.wh > 1 ? 0.54 * Math.PI : 0.5 * Math.PI),
                            this.scene.add(this.cylinderGroup);
                        case 13:
                        case 'end':
                          return e.stop();
                      }
                  },
                  e,
                  this
                );
              })
            )),
            function () {
              return t.apply(this, arguments);
            }),
        },
        {
          key: 'lerp',
          value: function (a, b, e) {
            return (1 - e) * a + e * b;
          },
        },
        {
          key: 'play',
          value: function () {
            (this.animate = !0), this.tick();
          },
        },
        {
          key: 'pause',
          value: function () {
            this.animate = !1;
          },
        },
        {
          key: 'tick',
          value: function () {
            const e = this.lerp(this.cylinderGroup.rotation.x, 0.02 * this.mousePos.x, 0.075),
              t = this.lerpedMouseRotationY;
            (this.lerpedMouseRotationY = this.lerp(t, 0.004 * this.mousePos.y, 0.075)),
              (this.cylinderGroup.rotation.y =
                (this.scrollProgress + this.lerpedMouseRotationY) * Math.PI * -1.5 - 0.33),
              (this.cylinderGroup.rotation.x = e),
              this.renderer.render(this.scene, this.camera),
              this.animate && requestAnimationFrame(this.tick);
          },
        },
        {
          key: 'onMouseMove',
          value: function (e, t) {
            (this.mousePos.x = e), (this.mousePos.y = t);
          },
        },
        {
          key: 'onScroll',
          value: function (progress) {
            this.scrollProgress = progress;
          },
        },
        {
          key: 'loadTexture',
          value: function (e) {
            return new Promise(function (t, n) {
              new l.i().load(
                e,
                function (e) {
                  t(e);
                },
                function () {
                  return null;
                },
                function () {
                  return n(new Error('error'));
                }
              );
            });
          },
        },
      ]),
      e
    );
  };
