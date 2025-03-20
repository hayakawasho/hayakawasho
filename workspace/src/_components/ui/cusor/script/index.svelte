<script lang="ts">
import { useTick } from "../../../../_libs/lake/useTick";
import { globalStore } from "../../../../_states";
import { lerp } from "../../../../_utils/lerp";

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

const onMove = (e: MouseEvent) => {
  clearTimeout(timer);

  state.isRunning = true;

  state.x = e.clientX;
  state.y = e.clientY;

  globalStore.getState().coordinate.updateCoordinate(state.x, state.y);

  timer = window.setTimeout(() => {
    state.isRunning = false;
  }, 500);
};

useTick(({ deltaRatio }) => {
  if (!state.isRunning) {
    return;
  }

  const p = 0.16 * deltaRatio;
  lastX = lerp(lastX, state.x, p);
  lastY = lerp(lastY, state.y, p);
});

$: diffX = lastX - state.x;
$: diffY = lastY - state.y;
</script>

<svelte:body on:mousemove|passive={onMove} />

<div class="cursor" style={`transform: translate3d(${lastX}px, ${lastY}px, 0px)`}>
  <div class="cursor__label">
    <span>Open</span>
    <span>Close</span>
  </div>
</div>

<style lang="scss">
  .cursor {
    display: grid;
    left: 1.5rem;
    // overflow: hidden;
    position: absolute;
    top: 1.5rem;
  }

  .cursor__label {
    font-size: 1.1rem;
    font-weight: 500;
    grid-area: 1 / 1;
    letter-spacing: normal;
    line-height: 1;
    // opacity: 0;
    text-transform: uppercase;
    will-change: transform;
  }
</style>
