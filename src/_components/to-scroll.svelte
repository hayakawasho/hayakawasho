<script lang="ts">
  import { Tween } from "@/_foundation/tween";

  console.log(Tween);
</script>

<button
  class="fixed bottom-0 left-1/2 h-[5rem] w-[6rem] flex items-center justify-center ml-[-3rem] pb-[2.4rem] z-20"
>
  <span class="label">Scroll</span>
  <span class="hr" />
</button>

<style>
  .label {
    font-family: var(--font-en);
    font-weight: 600;
    letter-spacing: 0.01em;
    font-size: 1.2rem;
    padding-bottom: 0.8em;
  }

  .hr {
    overflow: hidden;
    display: block;
    width: 3rem;
    position: absolute;
    top: 2.2rem;
    left: 50%;
    margin-left: -1.5rem;
    background-color: currentColor;
    height: 2px;
  }
</style>
