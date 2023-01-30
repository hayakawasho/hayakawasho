<script lang="ts">
  import { viewportMutators } from '@/states/viewport'
  import { posYMutators } from '@/states/scroll'
  import { debounce } from '@/libs'
  import { getContext, onMount } from 'svelte'
  import type { Context$ } from 'lake'

  let y: number

  const { rootRef } = getContext<Context$>('$')

  const ro = new ResizeObserver(
    debounce(([entry]) => {
      const { width, height } = entry.contentRect
      viewportMutators({ w: width, h: height })
    }, 250)
  )

  onMount(() => {
    ro.observe(rootRef)
  })

  $: posYMutators(y)
</script>

<svelte:window bind:scrollY={y} />
