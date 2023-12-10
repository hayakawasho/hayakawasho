import { defineComponent } from "lake";
import { Mesh, Program, Sphere as __, Geometry } from "ogl";
// import { useWindowSize } from "@/_states/window-size";
import { useTick } from "@/_foundation/hooks";
import type { ReadonlyRef } from "lake";
// import fragment from "./fragment.frag";
// import vertex from "./vertex.vert";
import type { OGLRenderingContext, Transform } from "ogl";

type Props = {
  gl: OGLRenderingContext;
  scene: Transform;
  isVisible: ReadonlyRef<boolean>;
};

export default defineComponent({
  name: "sketch",
  setup(_, props: Props) {
    const { gl, scene, isVisible } = props;

    const geometry = new Geometry(gl, {
      position: {
        data: new Float32Array([-1, -1, 3, -1, -1, 3]),
        size: 2,
      },
      uv: {
        data: new Float32Array([0, 0, 2, 0, 0, 2]),
        size: 2,
      },
    });

    // const geometry = new Sphere(gl);

    const program = new Program(gl, {
      fragment: /* glsl */ `
          precision highp float;

          uniform float uTime;

          varying vec2 vUv;

          void main() {
              gl_FragColor.rgb = vec3(0.8, 0.7, 1.0) + 0.3 * cos(vUv.xyx + uTime);
              gl_FragColor.a = 1.0;
          }
      `,
      uniforms: {
        uTime: { value: 0 },
      },
      vertex: /* glsl */ `
          attribute vec2 uv;
          attribute vec2 position;

          varying vec2 vUv;

          void main() {
              vUv = uv;
              gl_Position = vec4(position, 0, 1);
          }
      `,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    useTick(({ timestamp }) => {
      if (!isVisible.value) {
        return;
      }
      program.uniforms.uTime.value = timestamp * 0.001;
    });
  },
});
