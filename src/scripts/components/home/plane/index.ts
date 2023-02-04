import { defineComponent, useIntersectionWatch } from 'lake'
import type { Transform } from 'ogl'
import type { OGLRenderingContext } from 'ogl'
import { Mesh, Plane, Program, Texture } from 'ogl'
import { useSmooth, useWatch } from '@/libs/lake'
import { viewportRef } from '@/states/viewport'
import { ImagePlane } from './ImagePlane'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

type Props = {
  gl: OGLRenderingContext
  planesGroup: Transform
}

export default defineComponent<Props>({
  setup(domImg: HTMLImageElement, { gl, planesGroup }) {
    const state = {
      resizing: false,
      visible: false,
    }

    const rect = domImg.getBoundingClientRect()

    const texture = new Texture(gl)

    domImg.decode().then(() => {
      texture.image = domImg
    })

    const geometry = new Plane(gl)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTexture: {
          value: texture,
        },
        uImageAspect: {
          value: domImg.naturalWidth / domImg.naturalHeight,
        },
        uPlaneAspect: {
          value: rect.width / rect.height,
        },
      },
    })

    const mesh = new Mesh(gl, {
      geometry,
      program,
    })

    mesh.setParent(planesGroup)

    const plane = new ImagePlane(mesh, domImg)

    const { unwatch: _unwatch } = useIntersectionWatch(
      domImg,
      ([entry]) => {
        state.visible = entry.isIntersecting
      },
      {
        rootMargin: '25% 0px',
      }
    )

    useSmooth(() => {
      if (state.resizing || !state.visible) {
        return
      }
      plane.update()
    })

    useWatch(viewportRef, ({ width, height }) => {
      state.resizing = true
      plane.resize({ width, height })
      plane.update()
      state.resizing = false
    })
  },
})
