import { Transform } from 'ogl'
import { createCamera } from './createCamera'
import { createRenderer } from './createRenderer'
import { useTick, useWatch } from '@/libs'
import { viewportRef } from '@/states/viewport'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const dpr = Math.min(window.devicePixelRatio, 1.5)

  const { renderer } = createRenderer(canvas, width, height, dpr)
  const { gl } = renderer
  const { camera } = createCamera(gl, width, height)

  const scene = new Transform()

  useTick(({ timestamp: _ }) => {
    renderer.render({ scene, camera })
  })

  useWatch(viewportRef, ({ width, height }) => {
    renderer.setSize(width, height)

    camera.perspective({
      aspect: gl.canvas.width / gl.canvas.height,
    })

    const fov = camera.fov * (Math.PI / 180)
    const h = 2 * Math.tan(fov * 0.5) * camera.position.z
    const w = h * camera.aspect

    console.log(camera, w, h)
  })

  return {
    gl,
    addScene: (child: Transform) => {
      scene.addChild(child)
    },
    removeScene: (child: Transform) => {
      scene.removeChild(child)
    },
  }
}
