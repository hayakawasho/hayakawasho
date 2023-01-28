<script lang="ts">
  import { onMount } from 'svelte'
  import { useGl } from './useGl'

  let wrap: HTMLDivElement
  let canvas: HTMLCanvasElement

  onMount(() => {
    const { width, height } = wrap.getBoundingClientRect()
    const { resize } = useGl(canvas, width, height)

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      resize(width, height)
    })

    ro.observe(wrap)
  })
</script>

<div class="wrap" bind:this={wrap}>
  <canvas class="canvas" bind:this={canvas} />
</div>

<style>
  .wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
