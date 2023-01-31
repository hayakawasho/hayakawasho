import { Geometry, Program, Mesh } from 'ogl'
import { createCamera } from './createCamera'
import { createRenderer } from './createRenderer'
// import { createScene } from './createScene'
// import { createPool } from './createPool'
import { useTick } from '@/libs'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const dpr = Math.min(window.devicePixelRatio, 1.5)

  const { renderer, gl } = createRenderer(canvas, width, height, dpr)
  const { camera } = createCamera(gl, width / height)

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
    // gl,
    onResize(width: number, height: number) {
      renderer.setSize(width, height)

      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      })
    },

    addScene() {
      console.log('addScene')
    },

    removeScene() {
      console.log('removeScene')
    },
  }
}
