import { defineComponent, useIntersectionWatch } from 'lake'
import { Mesh, Plane, Program, Texture } from 'ogl'
import type { Provides, Size } from '@/const'
import { useScrollTween, useWatch } from '@/libs/lake'
import { ImagePlane } from './ImagePlane'
import { viewportRef, viewportGetters } from '@/states/viewport'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

type Props = Pick<Provides, 'glWorld'> & {
  geometry: Plane
}

export default defineComponent<Props>({
  setup(domImg: HTMLImageElement, { glWorld, geometry }) {
    const { gl, addScene } = glWorld

    const state = {
      resizing: false,
      visible: false,
    }

    // const planesIndex = Number(domImg.dataset.index)
    const rect = domImg.getBoundingClientRect()

    const texture = new Texture(glWorld.gl)

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

    addScene(mesh)

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

    useScrollTween(() => {
      if (state.resizing || !state.visible) {
        return
      }
      plane.update()
    })

    useWatch(viewportRef, ({ width, height }) => {
      state.resizing = true
      drawPlane({ width, height })
      state.resizing = false
    })

    return {
      //
    }
  },
})
