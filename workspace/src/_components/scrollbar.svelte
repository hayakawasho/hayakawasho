<script lang="ts">
  import { useScrollbarProgress } from '@/_states/scrollbar-progress';

  let progressY = 0;
  let valueNow = 0;

  useScrollbarProgress(({ pos, now }) => {
    progressY = pos;
    valueNow = now;
  });
</script>

<div
  aria-controls="main"
  role="scrollbar"
  aria-orientation="vertical"
  aria-valuemax={100}
  aria-valuemin={0}
  aria-valuenow={Math.floor(valueNow)}
>
  <div />
  <svg class="" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle class="_back" r="0" />
    <circle class="_front" r="0" />
  </svg>
</div>
