import { getGPUTier } from 'detect-gpu'
import { defineComponent, useDomRef, useSlot, useMount } from 'lake'
import modularLoad from 'modularload'
import Gl from '../gl'
import { wideQuery } from '@/const'
import type { GlobalContext, LoaderProps } from '@/const'

type Refs = {
  main: HTMLElement
  gl: HTMLElement
}

export default defineComponent({
  tagName: 'Loader',
  setup(_el, props: LoaderProps) {
    const { onCreated, onCleanup, onUpdated } = props

    const { addChild } = useSlot()
    const { refs } = useDomRef<Refs>('gl', 'main')

    const env: GlobalContext['env'] = {
      mq: wideQuery.matches ? 'pc' : 'sp',
      gpuTier: undefined,
    }

    getGPUTier().then(res => (env.gpuTier = res))

    const [gl] = addChild(refs.gl, Gl)

    const load = new modularLoad({
      enterDelay: 500,
      // exitDelay: 0,
      // loadedDelay: 0,
      // transitions: {},
    })

    const provides = {
      env,
      glContext: gl.current,
    }

    load.on('loading', (_transition: string, oldContainer: HTMLElement) => {
      onCleanup(oldContainer)
    })

    load.on(
      'loaded',
      (_transition: string, _oldContainer: HTMLElement, newContainer: HTMLElement) => {
        window.scrollTo(0, 0)

        onUpdated(newContainer, provides)
      }
    )

    useMount(() => {
      onCreated(provides)
    })
  },
})
