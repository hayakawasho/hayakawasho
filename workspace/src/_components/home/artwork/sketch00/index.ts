import { defineComponent } from "lake";
import { Mesh, Program, Geometry, Vec2 } from "ogl";
import { useTick } from "@/_foundation/hooks";
// import { createShaderPass } from "@/_glsl";
// import { useWindowSize } from "@/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { ReadonlyRef } from "lake";
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

    // const [ww] = useWindowSize();

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

    const uniforms = {
      resolution: {
        value: new Vec2(gl.canvas.width, gl.canvas.height),
      },
      u_time: {
        value: 0,
      },
    };

    const program = new Program(gl, {
      fragment,
      uniforms,
      vertex,
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    mesh.setParent(scene);
    mesh.scale.set(gl.canvas.width, gl.canvas.height);

    useTick(({ timeRatio }) => {
      if (!isVisible.value) {
        return;
      }
      uniforms.u_time.value += 0.01 * timeRatio;
    });
  },
});
