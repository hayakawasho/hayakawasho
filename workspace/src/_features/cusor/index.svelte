<script lang="ts">
  import { useTick } from '../../_hooks/use-tick';
  import { useMousePosition } from '../../_stores/mouse';
  import { lerp } from '../../_utils/lerp';

  let timer: number;

  const state = {
    isRunning: false,
    x: 0,
    y: 0,
  };

  let lastX = -100;
  let lastY = -100;
  let diffX = 0;
  let diffY = 0;

  const [_, setMousePos] = useMousePosition()

  const calcAngle = (x: number, y: number) => (180 * Math.atan2(y, x)) / Math.PI;
  const calcSqueeze = (x: number, y: number) => {
    const val = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return Math.min(val / 200, 0.55);
  };

  const onMove = (e: MouseEvent) => {
    clearTimeout(timer);

    state.isRunning = true;

    state.x = e.clientX;
    state.y = e.clientY;

    setMousePos({
      x: state.x,
      y: state.y,
    });

    timer = window.setTimeout(() => {
      state.isRunning = false;
    }, 500);
  };

  useTick(({ deltaRatio }) => {
    if (!state.isRunning) {
      return;
    }

    const p = 0.2 * deltaRatio;
    lastX = lerp(lastX, state.x, p);
    lastY = lerp(lastY, state.y, p);
  });

  $: diffX = lastX - state.x;
  $: diffY = lastY - state.y;
</script>

<svelte:body on:mousemove|passive={onMove} />

<div class="cursor" style={`transform: translate3d(${lastX}px, ${lastY}px, 0px)`}>
  <div class="cursor__inner">
    <span
      class="cursor__circle absolute inset-0"
      style={`transform: rotate(${calcAngle(diffX, diffY)}deg) scale(${1 + calcSqueeze(diffX, diffY)}, ${1 - calcSqueeze(diffX, diffY)}) translateZ(0)`}
    ></span>
  </div>
  <span class="cursor__hold absolute inset-0">
    <span class="cursor__hold-inner absolute inset-0 js-cursor-hold-inner" />
    <span class="cursor__hold-outer absolute inset-0 js-cursor-hold-outer" />
  </span>
</div>

<style lang="scss">
  .cursor {
    align-items: center;
    display: flex;
    justify-content: center;
    pointer-events: none;
    position: fixed;
    z-index: 11000;
    color: rgba(4, 31, 30, 0.2);

    @media (prefers-color-scheme: dark) {
      color: rgba(255, 246, 229, 0.2);
    }
  }

  .cursor__inner {
    height: 6.4rem;
    position: relative;
    transform: translate(-50%, -50%);
    width: 6.4rem;
  }

  .cursor__circle {
    border: 1px solid currentColor;
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
    border: 1px solid currentColor;
    border-radius: 100%;
    height: 3.2rem;
    margin: auto;
    transform: scale(0);
    width: 3.2rem;
  }
</style>
