<script lang="ts">
  import { Tween } from "@/_foundation/tween";

  console.log(Tween);
</script>

<button
  class="fixed bottom-0 left-1/2 h-[5rem] w-[6rem] flex items-center justify-center ml-[-3rem] pb-[2rem] z-20"
>
  <span class="label">Scroll</span>
  <span class="hr" />
</button>

<style>
  .label {
    font-family: var(--font-en);
    font-weight: 600;
    letter-spacing: 0.01em;
    font-size: 1.1rem;
    padding-bottom: 1em;
  }

  .hr {
    overflow: hidden;
    display: block;
    width: 2.8rem;
    position: absolute;
    top: 2.5rem;
    left: 50%;
    margin-left: -1.4rem;
    background-color: currentColor;
    height: 2px;
  }
</style>
