<script lang="ts">
  import { Tween } from "@/_foundation/tween";

  console.log(Tween);
</script>

<button
  class="fixed bottom-0 left-1/2 h-[6rem] w-[8rem] flex items-center justify-center ml-[-4rem] pb-[2rem] z-20"
>
  <span class="label">SCROLL</span>
  <span class="hr" />
</button>

<style>
  .label {
    font-family: var(--font-en);
    font-weight: 600;
    letter-spacing: 0.1em;
    font-size: 1.1rem;
    padding-bottom: 1.5em;
  }

  .hr {
    overflow: hidden;
    display: block;
    width: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 0 0 -2rem;
    background-color: currentColor;
    height: 2px;
  }
</style>
