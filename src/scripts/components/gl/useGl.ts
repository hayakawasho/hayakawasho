import { Transform, Torus, Program, Mesh } from 'ogl'
import { createCamera } from './createCamera'
import { createRenderer } from './createRenderer'
// import { createScene } from './createScene'
// import { createPool } from './createPool'
import { useTick } from '@/libs'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const dpr = Math.min(window.devicePixelRatio, 1.5)

  const { renderer } = createRenderer(canvas, width, height, dpr)
  const { gl } = renderer

  const scene = new Transform()

  const { camera } = createCamera(gl, width / height)

  const geometry = new Torus(gl, {
    radius: 1,
    tube: 0.5,
    radialSegments: 16,
    tubularSegments: 32,
  })

  const program = new Program(gl, {
    vertex: /* glsl */ `
      attribute vec3 position;
      attribute vec3 normal;

      uniform mat3 normalMatrix;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec3 vNormal;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,

    fragment: /* glsl */ `
      precision highp float;
      varying vec3 vNormal;

      void main() {
        gl_FragColor.rgb = normalize(vNormal);
        gl_FragColor.a = 1.0;
      }
    `,
  })

  const torus = new Mesh(gl, { geometry, program })
  torus.setParent(scene)

  useTick(({ timestamp: _ }) => {
    renderer.render({ scene, camera })
  })

  return {
    gl,
    onResize: (width: number, height: number) => {
      renderer.setSize(width, height)

      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      })
    },
    addScene: () => {
      console.log('addScene')
    },
    removeScene: () => {
      console.log('removeScene')
    },
  }
}
