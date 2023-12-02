<script lang="ts">
  // import { getContext } from "svelte";
  import { useTick } from '@/_foundation/hooks';
  import { lerp } from '@/_foundation/math';
  import { mousePosMutators } from '@/_states/mouse';
  // import type { AppContext } from "@/_foundation/type";
  // import type { Context$ } from "lake";

  let timer: number;

  const state = {
    isRunning: false,
    lastX: -20,
    lastY: -20,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
  };

  // const { mq } = getContext<Context$<AppContext>>("$");

  const onMousemove = (e: MouseEvent) => {
    clearTimeout(timer);

    state.isRunning = true;

    state.x = e.clientX;
    state.y = e.clientY;

    mousePosMutators({
      x: state.x,
      y: state.y,
    });

    timer = window.setTimeout(() => {
      state.isRunning = false;
    }, 500);
  };

  useTick(({ timeRatio }) => {
    if (!state.isRunning) {
      return;
    }

    const easeVal = 1 - (1 - 0.2) ** timeRatio;

    state.lastX = lerp(state.lastX, state.x, easeVal);
    state.lastY = lerp(state.lastY, state.y, easeVal);
  });
</script>

<svelte:body on:mousemove|passive={onMousemove} />

<div class="cursor" style="transform: translate3d({state.lastX}px, {state.lastY}px, 0px)">
  <div class="cursor__wrap">
    <div class="cursor__inner">
      <span
        class="cursor__circle absolute inset-0 js-cursor-circle"
        style="transform: rotate({state.rotate}deg) scale(${state.scaleX}, ${state.scaleY})"
      />
    </div>
    <span class="cursor__hold absolute inset-0">
      <span class="cursor__hold-inner absolute inset-0 js-cursor-hold-inner" />
      <span class="cursor__hold-outer absolute inset-0 js-cursor-hold-outer" />
    </span>
    <span class="cursor__click-hold-prompt absolute inset-0 | js-cursor-click-hold-prompt">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="14" y1="25" x2="34" y2="25" stroke-width="2" />
        <line opacity="0.4" x1="16" y1="20" x2="32" y2="20" stroke-width="2" />
        <line opacity="0.4" x1="16" y1="30" x2="32" y2="30" stroke-width="2" />
        <circle cx="24" cy="24" r="23.5" />
      </svg>
      <span>
        <span>Click &amp; Hold</span>
      </span>
    </span>
    <span
      class="absolute inset-0 cursor__drag | js-cursor-drag"
      style="transform: translate(-50%, -50%) scale(0, 0);"
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="49" class="video-indicator__outer" />
      </svg>
      <svg
        class="cursor__drag__arrows"
        width="46"
        height="10"
        viewBox="0 0 46 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.1667 5.625H2.15333L5.32667 9.125L4.53333 10L0 5L4.53333 0L5.32667 0.875L2.15333 4.375H14.1667V5.625Z"
          fill="black"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M31.0001 4.375L43.0134 4.375L39.8401 0.875L40.6334 -3.96317e-07L45.1667 5L40.6334 10L39.8401 9.125L43.0134 5.625L31.0001 5.625L31.0001 4.375Z"
          fill="black"
        />
      </svg>
    </span>
  </div>
</div>

<style lang="postcss">
  .cursor {
    align-items: center;
    display: flex;
    justify-content: center;
    pointer-events: none;
    position: fixed;
    z-index: 11000;
    color: var(--color-text);
  }

  .cursor__wrap {
    transform-origin: top left;
  }

  .cursor__inner {
    height: 6.4rem;
    position: relative;
    transform: translate(-50%, -50%);
    width: 6.4rem;
  }

  .cursor__circle {
    border: 1.5px solid currentColor;
    border-radius: 50%;
    height: 3.2rem;
    margin: auto;
    width: 3.2rem;
  }

  .cursor__hold {
    backface-visibility: hidden;
    transform: translate(-50%, -50%);
  }

  .cursor__hold,
  .cursor__hold-inner {
    border-radius: 100%;
    height: 3.2rem;
    width: 3.2rem;
  }

  .cursor__hold-inner {
    background-color: currentColor;
    transform: scale(0);
  }

  .cursor__hold-outer {
    border: 1.5px solid currentColor;
    border-radius: 100%;
    height: 3.2rem;
    margin: auto;
    transform: scale(0);
    width: 3.2rem;
  }

  .cursor__click-hold-prompt {
    height: 3.2rem;
    opacity: 0;
    text-align: center;
    transform: translate(-50%, -50%);
    visibility: hidden;
    width: 3.2rem;
  }

  .cursor__click-hold-prompt svg {
    display: block;
    height: 100%;
    width: 100%;
  }

  .cursor__click-hold-prompt svg circle,
  .cursor__click-hold-prompt svg line {
    stroke: currentColor;
  }

  .cursor__click-hold-prompt > span {
    display: flex;
    justify-content: center;
    margin-top: 0.25rem;
  }

  .cursor__click-hold-prompt > span > span {
    color: currentColor;
    font-size: 0.5rem;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .cursor__drag {
    height: 5rem;
    transform: translate(-50%, -50%) scale(0);
    width: 5rem;
  }

  .cursor__drag__arrows {
    height: 50%;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
  }
</style>
