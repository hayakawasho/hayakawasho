import { defineComponent, useIntersectionWatch, ref } from 'lake'
import { Mesh, Plane, Program, Texture } from 'ogl'
import type { Provides } from '@/const'
import { useScrollTween, useWatch } from '@/libs/lake'
import { ImagePlane } from './ImagePlane'
import { scrollPosYGetters } from '@/states/scroll'
import { viewportRef, viewportGetters } from '@/states/viewport'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

type Props = Pick<Provides, 'glWorld'> & {
  geometry: Plane
}

export type Cache = {
  ww: number
  wh: number
  rect: DOMRect
  currentY: number
}

export default defineComponent<Props>({
  setup(domImg: HTMLImageElement, { glWorld, geometry }) {
    const state = {
      resizing: false,
      visible: false,
    }

    const { width: ww, height: wh } = viewportGetters()
    const cache = ref<Cache>({
      ww,
      wh,
      rect: domImg.getBoundingClientRect(),
      currentY: scrollPosYGetters(),
    })

    // const planesIndex = Number(domImg.dataset.index)

    const texture = new Texture(glWorld.gl)

    domImg.decode().then(() => {
      texture.image = domImg
      uniforms.uImageAspect.value = domImg.naturalWidth / domImg.naturalHeight

      plane.update(cache.value)
    })

    const uniforms = {
      uTexture: {
        value: texture,
      },
      uImageAspect: {
        value: 1,
      },
      uPlaneAspect: {
        value: cache.value.rect.width / cache.value.rect.height,
      },
    }

    const program = new Program(glWorld.gl, {
      vertex,
      fragment,
      uniforms,
    })

    const mesh = new Mesh(glWorld.gl, {
      geometry,
      program,
    })

    glWorld.addScene(mesh)

    const plane = new ImagePlane(mesh)

    useIntersectionWatch(
      domImg,
      ([entry]) => {
        state.visible = entry.isIntersecting
      },
      {
        rootMargin: '25% 0px',
      }
    )

    useScrollTween(payload => {
      if (state.resizing || !state.visible) {
        return
      }

      cache.value = {
        ...cache.value,
        currentY: payload.current,
      }
      plane.update(cache.value)
    })

    useWatch(viewportRef, ({ width, height }) => {
      state.resizing = true

      cache.value = {
        ...cache.value,
        rect: domImg.getBoundingClientRect(),
        ww: width,
        wh: height,
      }
      plane.update(cache.value)

      state.resizing = false
    })

    return {
      //
    }
  },
})
