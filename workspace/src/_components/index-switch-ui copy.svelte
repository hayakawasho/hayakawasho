<script lang="ts">
  const table = {
    Home: '',
    Works: '',
  };

  console.log(table);

  const onSwitch = (_e: MouseEvent) => {
    //
  };
</script>

<div class="indexSwitchWrap">
  <button class="indexSwitch -active" on:click={onSwitch}>
    <span class="indexSwitch__active -r" />
    <span class="indexSwitch__name">Visual</span>
    <span class="indexSwitch__name">Text</span>
  </button>
</div>

<style>
  .indexSwitchWrap {
    --w: 16rem;
    --h: 3.4rem;
    --m: 0.5rem;

    @media (min-width: 640px) {
      --w: 18rem;
      --h: 3.6rem;
    }
  }

  .indexSwitch {
    position: fixed;
    z-index: 11;
    left: 50%;
    bottom: 3rem;
    transform: translate3d(-50%, 8rem, 0);
    width: var(--w);
    height: var(--h);
    padding: 0 var(--m);
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.6s cubic-bezier(0.43, 0.05, 0.17, 1) 0.3s,
      transform 0.6s cubic-bezier(0.55, 0.05, 0.22, 0.99) 0.4s;

    @media (min-width: 640px) {
      bottom: 5rem;
      transform: translate3d(-50%, 10rem, 0);
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: var(--h);
      height: 100%;
      border-radius: calc(var(--h) / 2);
      background: #fff;
      transform: translate3d(-50%, 0, 0);
      transition: width 0.7s cubic-bezier(0.55, 0.05, 0.22, 0.99);

      @media (prefers-color-scheme: dark) {
        background: transparent;
        border: 1px solid var(--color-text);
      }
    }

    &.-active {
      pointer-events: auto;
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
      transition: opacity 0.6s cubic-bezier(0.43, 0.05, 0.17, 1),
        transform 0.6s cubic-bezier(0.55, 0.05, 0.22, 0.99);

      &:before {
        width: 100%;
        transition: width 0.7s cubic-bezier(0.55, 0.05, 0.22, 0.99) 0.4s;
      }

      & > .indexSwitch__active {
        opacity: 1;
        transform: translateZ(0);
        transition: transform 0.7s cubic-bezier(0.43, 0.05, 0.17, 1) 0.7s;
      }

      & > .indexSwitch__name {
        opacity: 1;
        transition: opacity 0.5s cubic-bezier(0.18, 0.06, 0.23, 1) 0.8s;
      }
    }
  }

  .indexSwitch__active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(0, 110%, 0);
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.26, 0.06, 0, 1), transform 0s 0.7s;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: var(--m);
      left: var(--m);
      width: calc(var(--w) / 2 - var(--m));
      height: calc(var(--h) - (var(--m) * 2));
      background-color: #121212;
      border-radius: calc(var(--h) / 2);
    }

    &:before {
      transition: transform 0.5s cubic-bezier(0.43, 0.05, 0.17, 1);
    }

    &:after {
      transition: transform 0.9s cubic-bezier(0.55, 0.05, 0.22, 0.99);
    }

    &.-l {
      &:before,
      &:after {
        transform: translateZ(0);
      }
    }

    &.-r {
      &:before,
      &:after {
        transform: translate3d(100%, 0, 0);
      }
    }
  }

  .indexSwitch__name {
    position: relative;
    width: 50%;
    font-size: 1.1rem;
    color: #fff;
    opacity: 0;
    transition: opacity 0.2s cubic-bezier(0.26, 0.06, 0, 1);
    mix-blend-mode: difference;

    @media (prefers-color-scheme: dark) {
      color: var(--color-text);
    }

    @media (min-width: 640px) {
      font-size: 1.2rem;
    }
  }
</style>
