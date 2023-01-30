<script lang="ts">
  import { viewportMutators } from '@/states/viewport'
  import { scrollDeltaYMutators, scrollPosYMutators, scrollRunningMutators } from '@/states/scroll'
  import { debounce } from '@/libs'
  import { getContext, onMount } from 'svelte'
  import { useEvent } from 'lake'
  import type { Context$ } from 'lake'
  import type { Provides } from '@/const'

  const { rootRef, GL } = getContext<Context$<Provides>>('$')

  let timer: number
  let posY = 0

  useEvent(
    window as any,
    'scroll',
    () => {
      clearTimeout(timer)

      const y = window.scrollY
      const diff = posY - y
      posY = y

      scrollPosYMutators(posY)
      scrollDeltaYMutators(diff)
      scrollRunningMutators(true)

      timer = window.setTimeout(() => {
        scrollRunningMutators(false)
      }, 300)
    },
    {
      passive: true,
    }
  )

  const ro = new ResizeObserver(
    debounce(([entry]) => {
      const { width, height } = entry.contentRect

      GL.onResize(width, height)
      viewportMutators({ width, height })
    }, 250)
  )

  onMount(() => {
    ro.observe(rootRef)
  })
</script>
