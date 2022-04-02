<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  onMount(() => {
    console.log("mount");
  });

  onDestroy(() => {
    console.log("destroy");
  });
</script>

<div class="fixed inset-0">
  <div class="h-screen w-screen">
    <canvas />
  </div>
</div>
