<script lang="ts">
  import { useMount } from "lake";
  import { getContext } from "svelte";
  import { Tween } from "@/_foundation/tween";
  import { noop } from "@/_foundation/utils";
  import { useScrollTween } from "@/_states/scroll";
  import { useWindowSize } from "@/_states/window-size";
  import type { GlobalContext } from "@/_foundation/type";
  import type { Context$ } from "lake";

  const { scrollContext, initialMount } =
    getContext<Context$<GlobalContext>>("$");

  const [_ww, wh] = useWindowSize();
  const [y] = useScrollTween(noop);

  let wrapRef: HTMLElement;

  useMount(() => {
    if (initialMount) {
      Tween.serial(
        Tween.wait(0.5),
        Tween.tween(wrapRef, 1.6, "expo.out", {
          y: "0%",
        })
      );
    }
  });
</script>

<button
  class="toScroll"
  on:click={() => scrollContext.scrollTo(y.value + wh.value)}
  bind:this={wrapRef}
>
  <span class="label">Scroll</span>
  <span class="hr" />
</button>

<style lang="postcss">
  .toScroll {
    position: fixed;
    bottom: 0;
    left: 50%;
    height: 5rem;
    width: 6rem;
    margin-left: -3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    padding-bottom: 2rem;
    transform: translateY(100%);

    @media (min-width: 640px) {
      height: 8rem;
      width: 6rem;
      margin-left: -3rem;
      padding-bottom: 4rem;
    }
  }

  .label {
    font-family: var(--font-en);
    font-weight: 600;
    letter-spacing: 0.01em;
    font-size: 1.2rem;
    padding-bottom: 0.8em;

    @media (min-width: 640px) {
      font-size: 1.8rem;
    }
  }

  .hr {
    overflow: hidden;
    display: block;
    width: 3rem;
    position: absolute;
    top: 2rem;
    left: 50%;
    margin-left: -1.5rem;
    background-color: currentColor;
    height: 2px;

    @media (min-width: 640px) {
      top: 2.8rem;
      width: 4.4rem;
      margin-left: -2.2rem;
    }
  }
</style>
