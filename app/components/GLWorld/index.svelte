<script lang="ts">
  import { onMount } from 'svelte'
  import { createGl } from './'

  let canvas: HTMLCanvasElement

  function onResize() {
    console.log('resize')
  }

  onMount(() => {
    createGl(canvas)
  })
</script>

<canvas class="h-screen w-screen" bind:this={canvas} />

<svelte:window on:resize={onResize} />
