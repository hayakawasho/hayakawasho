import { Transform } from 'ogl'
import { useTick, useWatch } from '@/libs/lake'
import { createCamera, createRenderer } from '@/libs/ogl'
import { viewportRef } from '@/states/viewport'

export const useGlWorld = (canvas: HTMLCanvasElement, ww: number, wh: number) => {
  const dpr = Math.min(window.devicePixelRatio, 1.5)

  const { renderer } = createRenderer(canvas, ww, wh, dpr)
  const { gl } = renderer

  const { camera, calc } = createCamera(gl, ww, wh)

  const scene = new Transform()

  useTick(({ timestamp: _ }) => {
    renderer.render({ scene, camera })
  })

  useWatch(viewportRef, ({ width, height }) => {
    renderer.setSize(width, height)

    const { fov, distance } = calc(height)
    camera.perspective({
      aspect: width / height,
      fov,
    })
    camera.position.z = distance
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
