<script lang="ts">
  import { Tween } from "@/_foundation/tween";

  console.log(Tween);
</script>

<a
  href="/"
  class="fixed top-[2rem] left-1/2 w-[2rem] h-[2rem] ml-[-1rem] z-20"
  data-load="project2home"
>
  <svg viewBox="0 0 50 50" class="back-to-svg">
    <path d="M10.86,39.14,39.14,10.86" class="path" style="" />
    <path d="M10.86,10.86,39.14,39.14" class="path" style="" />
  </svg>
</a>

<style>
  .back-to-svg path {
    stroke: #f0f2f2;
    stroke-width: 7px;
  }

  .path {
    fill: none;
    stroke: #f0f2f2;
    stroke-miterlimit: 10;
    stroke-width: 28px;
  }
</style>
