import { defineComponent, useIntersectionWatch, useMount } from 'lake'
import type { Transform } from 'ogl'
import { Mesh, Plane, Program, Texture } from 'ogl'
import type { Provides } from '@/const'
import { useSmooth, useWatch } from '@/libs/lake'
import { viewportRef, viewportGetters } from '@/states/viewport'
import { ImagePlane } from './ImagePlane'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

type Props = Pick<Provides['GL_WORLD'], 'gl'> & {
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

    const draw = (size: { width: number; height: number }) => {
      plane.resize(size)
      plane.update()
    }

    const { unwatch: _unwatch } = useIntersectionWatch(
      domImg,
      ([entry]) => {
        state.visible = entry.isIntersecting
      },
      {
        rootMargin: '25% 0px',
      }
    )

    useMount(() => {
      const size = viewportGetters()
      draw(size)
    })

    useSmooth(() => {
      if (state.resizing || !state.visible) {
        return
      }
      plane.update()
    })

    useWatch(viewportRef, size => {
      state.resizing = true
      draw(size)
      state.resizing = false
    })
  },
})
