import { defineComponent, useMount, ref } from 'lake';
import {
  Vector2,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
  Color,
} from '@/_foundation/three';
// import { Tween } from '@/_foundation/tween';
import { map } from '@/_foundation/math';
import { ImagePlane } from '@/_glsl';
import { useScrollPosY } from '@/_states/scroll';
import { useWindowSize } from '@/_states/window-size';
import fragment from './fragment.frag';
// import vertex from './vertex.vert';
// import fragment from './peel.frag';
import vertex from './peel.vert';
import type { AppContext } from '@/_foundation/type';

const loader = new TextureLoader();
loader.crossOrigin = 'anonymous';

export default defineComponent({
  name: 'Screenshot',
  setup(el: HTMLImageElement, context: AppContext) {
    const { frontCanvasContext, mq, history } = context;

    const src = el.dataset.src!;
    const texSrc = {
      pc: src + '?auto=compress,format',
      sp: src + '?auto=compress,format&w=750',
    };

    const isResizing = ref(false);

    const texture = loader.load(texSrc[mq.value], texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    const [ww, wh] = useWindowSize();

    const { width, height, top } = el.getBoundingClientRect();

    const offsetY = ref(-wh.value + top);

    const uniforms = {
      u_image_size: {
        value: new Vector2(Number(el.dataset.w), Number(el.dataset.h)),
      },
      u_mesh_size: {
        value: new Vector2(width, height),
      },
      u_texture: {
        value: texture,
      },
      u_opacity: {
        value: 1,
      },
      u_progress: {
        value: 0,
      },
      u_enableBend: {
        value: true,
      },
      // u_innerScale: {
      //   value: 1,
      // },
      // u_innerY: {
      //   value: 0,
      // },
      // u_innerX: {
      //   value: 0,
      // },
      // u_screenCenterTexture: {
      //   value: 0,
      // },
      // u_edgeFade: {
      //   value: 1,
      // },
      // u_time: {
      //   value: 0,
      // },
      // u_size: {
      //   value: [1, 1],
      // },
      // fogNear: {
      //   value: 0,
      // },
      // fogFar: {
      //   value: 0,
      // },
      // fogColor: {
      //   value: new Color('black'),
      // },
    };

    const geometry = new PlaneBufferGeometry(1, 1);
    const material = new ShaderMaterial({
      fragmentShader: fragment,
      uniforms,
      vertexShader: vertex,
    });

    const mesh = new Mesh(geometry, material);
    const plane = new ImagePlane(mesh, el);

    useWindowSize(({ ww, wh }) => {
      isResizing.value = true;
      plane.resize(ww, wh);
      isResizing.value = false;
    });

    useScrollPosY(({ currentY, oldY }) => {
      if (isResizing.value || currentY === oldY) {
        return;
      }

      plane.updateY(currentY);

      // const progress = map(currentY, offsetY.value, offsetY.value + wh.value * 0.5, 0, 1.5);
      const progress = map(currentY, offsetY.value, offsetY.value + height, 0, 1.5);
      uniforms.u_progress.value = progress;
    });

    useMount(() => {
      plane.resize(ww.value, wh.value);
      frontCanvasContext.addScene(mesh);

      return () => {
        if (history.value === 'pop') {
          frontCanvasContext.removeScene(mesh);
          return;
        }

        frontCanvasContext.removeScene(mesh);
      };
    });
  },
});

/**

        var zt = {
            name: "webglPeelEffect",
            extendTimeline: !0,
            effect: (e,t)=>(t.glProps && delete t.glProps,
            o.mq.sm.matches && (e[0]._glProps.uniforms.u_enableBend = !0),
            e[0]._glProps.uniforms.u_progress = 0,
            l.ZP.to(e[0], function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Dt(Object(s), !0).forEach((function(t) {
                        Gt(e, t, s[t])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : Dt(Object(s)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                    }
                    ))
                }
                return e
            }({
                glProps: {
                    uniforms: {
                        u_progress: 1.5
                    }
                }
            }, t), 0)),
            defaults: {
                ease: "sine.out",
                scrollTrigger: {
                    scrub: !0,
                    once: !1,
                    start: "top bottom",
                    end: "bottom 70%"
                }
            }
        };


            uniforms: {
                u_texture: {
                    value: null
                },
                u_texture2: {
                    value: null
                },
                u_opacity: {
                    value: 1
                },
                u_innerScale: {
                    value: 1
                },
                u_innerY: {
                    value: 0
                },
                u_innerX: {
                    value: 0
                },
                u_screenCenterTexture: {
                    value: 0
                },
                u_edgeFade: {
                    value: 1
                },
                u_progress: {
                    value: 0
                },
                u_enableBend: {
                    value: !1
                },
                u_time: {
                    value: 0
                },
                u_size: {
                    value: [1, 1]
                },
                fogNear: {
                    value: 0
                },
                fogFar: {
                    value: 0
                },
                fogColor: {
                    value: new i.Ilk
                }
            },

        vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec4 v_worldPos;\nvarying vec2 ssCoords;\n\nuniform float u_progress;\nuniform bool u_enableBend;\n\n#define M_PI 3.1415926535897932384626433832795\n\nvoid main () {\n\n    vec3 pos = position;\n    v_worldPos = modelMatrix * vec4(position, 1.);\n\n    mat4 MVPM = projectionMatrix * modelViewMatrix;\n    vec4 originalPosition = MVPM * vec4(position, 1.);\n    ssCoords = vec2(originalPosition.xy / originalPosition.w);\n\n\tif (u_enableBend) {\n\t\tfloat startAt = uv.y - 0.5;\n\t\tfloat finishAt = uv.y;\n\t\tfloat bend = smoothstep(startAt, finishAt, 1. - u_progress);\n\t\t\n\t\tpos.x *= 1. + (bend * .2) * abs(ssCoords.x);\n\t\tpos.z += ((1. - u_progress + 0.5) * 250.);\n\t}\n    \n    vUv = uv;\n    gl_Position = MVPM * vec4(pos, 1.);\n\n}",
        fragmentShader: "vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3846153846) * direction;\n  vec2 off2 = vec2(3.2307692308) * direction;\n  color += texture2D(image, uv) * 0.2270270270;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;\n  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;\n  return color;\n}\n\nvec2 scaleUv(vec2 uv, vec2 scaleOrigin, float scale) {\n    return vec2(uv - scaleOrigin) / scale + scaleOrigin;\n}\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec4 v_worldPos;\nvarying vec2 ssCoords;\n\nuniform sampler2D u_texture;\nuniform float u_opacity;\nuniform float u_innerScale;\nuniform float u_innerY;\nuniform float u_innerX;\nuniform float u_screenCenterTexture;\nuniform float u_edgeFade;\nuniform vec2 u_resolution;\nuniform vec2 u_size;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nvec2 scaleOrigin = vec2(0.5, 0.5);\n\nvoid main() {\n    vec2 uv = vUv;\n    uv.y += u_innerY;\n    uv.x += u_innerX;\n\n    vec2 screenCenter = (v_worldPos.xy / u_size) + 0.5;\n    uv = screenCenter * (0. + u_screenCenterTexture) + uv * (1. - u_screenCenterTexture);\n\n\tvec4 color = texture2D(u_texture, vec2(vec2(uv - scaleOrigin) / u_innerScale + scaleOrigin));\n    \n    float colorShiftR = blur9(u_texture, scaleUv(uv + vec2(0., 0.005), scaleOrigin, u_innerScale), u_resolution, vec2(3., -3.)).r;\n    float colorShiftG = blur9(u_texture, scaleUv(uv + vec2(0., -0.005), scaleOrigin, u_innerScale), u_resolution, vec2(-3., 3.)).g;\n\tcolor.a = color.a * u_opacity;\n\n    float thresholdLeft = smoothstep(-0.85, -1., ssCoords.x) * u_edgeFade;\n    float thresholdRight = smoothstep(0.85, 1., ssCoords.x) * u_edgeFade;\n    float thresholdTop = smoothstep(0.85, 1., ssCoords.y) * u_edgeFade;\n    float thresholdBottom = smoothstep(-0.85, -1., ssCoords.y) * u_edgeFade;\n    float threshold = thresholdLeft + thresholdRight + thresholdBottom + thresholdTop;\n    color.r = mix(color.r, colorShiftR, threshold);\n    color.g = mix(color.g, colorShiftG, threshold);\n\n\tgl_FragColor = color;\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}",
        transparent: !0


        var rs = "#define GLSLIFY 1\nvoid main () {\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}"
          , as = "#define GLSLIFY 1\n#define M_PI 3.141592653589\n\nuniform vec2 u_resolution;\nuniform vec3 u_fromColor;\nuniform vec3 u_toColor;\nuniform float u_progress;\nuniform float u_adjust;\nuniform float u_velo;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nfloat parabola( float x, float k, float curve ){\n    return pow( curve * x * (1.0 - x), k );\n}\n\nvoid main() {\n\t// vec2 st = gl_FragCoord.xy / u_resolution.xy;\n\t// float curve = parabola(st.x, (1. - u_progress) * 4.340, u_progress * 4.728);\n\t// vec3 finalColor = mix(u_fromColor, u_toColor, step(st.y, curve));\n\t// gl_FragColor = vec4(finalColor, 1.);\n\n\tvec2 uv = gl_FragCoord.xy / u_resolution.xy;\n\tfloat pct = 1. - ((distance(uv, vec2(.5))) * u_adjust);\n    pct = smoothstep(0., 1., pct);\n    uv.y -= ((sin(uv.x * M_PI) * u_velo) * .5);\n    float tf = step(uv.y, clamp(u_progress * pct, 0., 1.));\n    vec3 finalColor = mix(u_fromColor, u_toColor, tf);\n\tgl_FragColor = vec4(finalColor, 1.);\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}";
        var ls = "#define GLSLIFY 1\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\nuniform sampler2D uMatcap;\nuniform vec3 uBaseColor;\nuniform float uOpacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nvoid main() {\n\tfloat faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\n\tvec3 viewDir = normalize( vViewPosition );\n    vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n    vec3 y = cross( viewDir, x );\n    vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\t\n\tvec3 matcapColor = texture2D( uMatcap, uv ).rgb;\n\n\t#ifdef LIGHTMODE\n\t\tmatcapColor += uBaseColor;\n\t#endif\n\n\tgl_FragColor = vec4(matcapColor, uOpacity);\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}";

        */
