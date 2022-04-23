<script lang="ts">
  import { onMount } from 'svelte'
  import { createScene, resize } from './scene'

  let canvasRef: HTMLCanvasElement

  function onResize() {
    resize()
  }

  onMount(() => {
    createScene(canvasRef)
  })
</script>

<div class="fixed inset-0">
  <canvas class="h-screen w-screen" bind:this={canvasRef} />
</div>

<svelte:window on:resize={onResize} />
