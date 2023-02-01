import { Transform } from 'ogl'
import { createCamera } from './createCamera'
import { createRenderer } from './createRenderer'
import { useTick } from '@/libs'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const dpr = Math.min(window.devicePixelRatio, 1.5)

  const { renderer } = createRenderer(canvas, width, height, dpr)
  const { gl } = renderer

  const scene = new Transform()

  const { camera } = createCamera(gl, width, height)

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

      const fov = camera.fov * (Math.PI / 180)
      const h = 2 * Math.tan(fov * 0.5) * camera.position.z
      const w = h * camera.aspect

      console.log(camera, w, h)
    },
    addScene: (child: Transform) => {
      scene.addChild(child)
    },
    removeScene: (child: Transform) => {
      scene.removeChild(child)
    },
  }
}
