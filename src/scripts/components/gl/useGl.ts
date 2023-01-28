import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'
import { useTick } from '@/libs'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const dpr = Math.min(window.devicePixelRatio, 1.5)

  const renderer = new Renderer({
    canvas,
    dpr,
  })

  renderer.setSize(width, height)

  const { gl } = renderer

  gl.clearColor(0, 0, 0, 0)

  const camera = new Camera(gl, {
    fov: 45,
    aspect: width / height,
    near: 0.1,
    far: 100,
  })

  camera.position.z = 50

  const geometry = new Geometry(gl, {
    position: {
      size: 2,
      data: new Float32Array([-1, -1, 3, -1, -1, 3]),
    },
    uv: {
      size: 2,
      data: new Float32Array([0, 0, 2, 0, 0, 2]),
    },
  })

  const program = new Program(gl, {
    vertex: /* glsl */ `
      attribute vec2 uv;
      attribute vec2 position;

      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `,

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
      uTime: {
        value: 0,
      },
    },
  })

  const mesh = new Mesh(gl, {
    geometry,
    program,
  })

  useTick(({ timestamp }) => {
    renderer.render({ scene: mesh })
    program.uniforms.uTime.value = timestamp * 0.001
  })

  return {
    resize(w: number, h: number) {
      renderer.setSize(w, h)
      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      })
    },
  }
}
