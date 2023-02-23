import { defineComponent, useIntersectionWatch, ref, useMount, useUnmount } from 'lake'
import { Mesh, Plane, Program, Texture } from 'ogl'
import type { Provides } from '@/const'
import { useScrollTween, useWatch } from '@/libs/lake'
import { ImagePlane } from './ImagePlane'
import { scrollPosYGetters } from '@/states/scroll'
import { viewportRef, viewportGetters } from '@/states/viewport'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

type Props = Pick<Provides, 'glContext'> & {
  geo: Plane
}

export type Cache = {
  ww: number
  wh: number
  rect: DOMRect
  currentY: number
}

export default defineComponent<Props>({
  setup(domImg: HTMLImageElement, { glContext, geo }) {
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

    const texture = new Texture(glContext.gl)

    domImg.crossOrigin = 'anonymous'
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

    const program = new Program(glContext.gl, {
      vertex,
      fragment,
      uniforms,
    })

    const mesh = new Mesh(glContext.gl, {
      geometry: geo,
      program,
    })

    const plane = new ImagePlane(mesh)

    useIntersectionWatch(
      domImg,
      ([entry]) => {
        state.visible = entry.isIntersecting
      },
      {
        rootMargin: '25%',
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
        currentY: scrollPosYGetters(),
      }

      plane.update(cache.value)

      state.resizing = false
    })

    useMount(() => {
      glContext.addScene(mesh)
    })

    useUnmount(() => {
      glContext.removeScene(mesh)
    })

    return {
      //
    }
  },
})
