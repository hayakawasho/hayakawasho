import { Transform } from 'ogl'
import { createCamera } from './createCamera'
import { createRenderer } from './createRenderer'
import { useTick, useWatch } from '@/libs'
import { viewportRef } from '@/states/viewport'

export const useGlWorld = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const dpr = Math.min(window.devicePixelRatio, 1.5)

  const { renderer } = createRenderer(canvas, width, height, dpr)
  const { gl } = renderer

  const { fov, dist } = calcFov(height)
  const { camera } = createCamera(gl, width, height, fov, dist)

  const scene = new Transform()

  useTick(({ timestamp: _ }) => {
    renderer.render({ scene, camera })
  })

  useWatch(viewportRef, ({ width, height }) => {
    renderer.setSize(width, height)

    const { fov, dist } = calcFov(height)
    camera.perspective({
      aspect: gl.canvas.width / gl.canvas.height,
      fov,
    })
    camera.position.z = dist
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

function calcFov(wh: number) {
  const fov = 60
  const fovRad = fov * 0.5 * (Math.PI / 180)
  const dist = (wh * 0.5) / Math.tan(fovRad)

  return {
    fov,
    dist,
  }
}
