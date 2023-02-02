import { defineComponent } from 'lake'
import type { Transform } from 'ogl'
import type { OGLRenderingContext } from 'ogl'
import { Mesh, Plane, Program, Texture } from 'ogl'
import { useTick } from '@/libs'
import { ImagePlane } from './ImagePlane'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

type Props = {
  gl: OGLRenderingContext
  planesGroup: Transform
}

export default defineComponent<Props>({
  setup(img: HTMLImageElement, { gl, planesGroup }) {
    const rect = img.getBoundingClientRect()

    const texture = new Texture(gl)

    img.decode().then(() => {
      texture.image = img
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
          value: img.naturalWidth / img.naturalHeight,
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

    const plane = new ImagePlane(mesh, img)

    useTick(() => {
      plane.update()
    })

    return {
      resize(size: { width: number; height: number }) {
        plane.resize(size)
      },
    }
  },
})
