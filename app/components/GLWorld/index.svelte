<script lang="ts">
  import { onMount } from 'svelte'

  let refCanvas: HTMLCanvasElement

  function onResize() {
    //
  }

  onMount(() => {
    console.log(refCanvas)
  })
</script>

<div class="fixed inset-0">
  <canvas class="h-screen w-screen" bind:this={refCanvas} />
</div>

<svelte:window on:resize={onResize} />
