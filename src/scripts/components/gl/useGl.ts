import { Transform } from 'ogl'
import { useTick, useWatch } from '@/libs/lake'
import { createCamera, createRenderer } from '@/libs/ogl'
import { viewportRef } from '@/states/viewport'

export const useGl = (canvas: HTMLCanvasElement, ww: number, wh: number, dpr: number) => {
  const { renderer } = createRenderer(canvas, ww, wh, dpr)
  const { gl } = renderer

  const { camera, calcDistance } = createCamera(gl, ww, wh)

  const scene = new Transform()

  useTick(() => {
    renderer.render({ scene, camera })
  })

  useWatch(viewportRef, ({ width, height }) => {
    renderer.setSize(width, height)

    const { dist } = calcDistance(height)

    camera.perspective({ aspect: width / height })
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
