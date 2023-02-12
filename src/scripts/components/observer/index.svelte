<script lang="ts">
  import { getContext } from 'svelte'
  import { useEvent } from 'lake'
  import type { Context$ } from 'lake'
  import type { Provides } from '@/const'
  import { createScrollHandler } from './createScrollHandler'
  import { createResizeObserver } from './createResizeObserver'
  import { createMouseHandler } from './createMouseHandler'

  const { rootRef } = getContext<Context$<Provides>>('$')

  createResizeObserver(rootRef)

  const { onScroll } = createScrollHandler()
  useEvent(window as any, 'scroll', onScroll, {
    passive: true,
  })

  const { onMousemove } = createMouseHandler()
</script>

<svelte:body on:mousemove|passive={onMousemove} />
