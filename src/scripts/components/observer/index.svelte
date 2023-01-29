<script lang="ts">
  import { viewportMutators } from '@/states/viewport'
  import { posYMutators } from '@/states/scroll'

  let w: number
  let h: number
  let y: number

  $: viewportMutators({ w, h })
  $: posYMutators(y)
</script>

<div class="observer" bind:clientWidth={w} bind:clientHeight={h} />
<svelte:window bind:scrollY={y} />

<style>
  .observer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
