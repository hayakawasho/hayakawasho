import { defineComponent, useIntersectionWatch, useMount } from 'lake'
import type { Transform } from 'ogl'
import { Mesh, Plane, Program, Texture } from 'ogl'
import type { Provides, Size } from '@/const'
import { useSmooth, useWatch } from '@/libs/lake'
import { viewportRef, viewportGetters } from '@/states/viewport'
import { ImagePlane } from './ImagePlane'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

type Props = Pick<Provides['GL_WORLD'], 'gl'> & {
  planesGroup: Transform
  geometry: Plane
}

export default defineComponent<Props>({
  setup(domImg: HTMLImageElement, { gl, planesGroup, geometry }) {
    const state = {
      resizing: false,
      visible: false,
    }

    // const planesIndex = Number(domImg.dataset.index)
    const rect = domImg.getBoundingClientRect()

    const texture = new Texture(gl)

    domImg.decode().then(() => {
      texture.image = domImg
      uniforms.uImageAspect.value = domImg.naturalWidth / domImg.naturalHeight

      drawPlane(viewportGetters())
    })

    const uniforms = {
      uTexture: {
        value: texture,
      },
      uImageAspect: {
        value: 1,
      },
      uPlaneAspect: {
        value: rect.width / rect.height,
      },
    }

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
    })

    const mesh = new Mesh(gl, {
      geometry,
      program,
    })

    mesh.setParent(planesGroup)

    const plane = new ImagePlane(mesh, domImg)

    const drawPlane = (size: Size) => {
      plane.resize(size)
      plane.update()
    }

    const { unwatch: _ } = useIntersectionWatch(
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

    useWatch(viewportRef, size => {
      state.resizing = true
      drawPlane(size)
      state.resizing = false
    })

    return {
      //
    }
  },
})
