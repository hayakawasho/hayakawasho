<script lang="ts">
  //
</script>

<ul class="links">
  <li>
    <a href="/about/" class="link">
      <span class="inline-block overflow-hidden leading-[1]">
        <span class="linkLabel">About</span>
      </span>
    </a>
  </li>
</ul>

<style lang="postcss">
  .links {
    position: fixed;
    z-index: 99;
    top: 3.2rem;
    right: 2.2rem;
    text-align: right;
    display: flex;
    gap: 2rem;
    padding: 0.8rem;

    @media (min-width: 640px) {
      top: 5.6rem;
      right: 6.4rem;
    }
  }

  .link {
    display: inline-block;
    vertical-align: top;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
    font-weight: 300;
    overflow: hidden;

    @media (min-width: 640px) {
      font-size: 1.6rem;
      opacity: 1;
      pointer-events: auto;
    }
  }

  .link > span {
    line-height: 1;
    display: inline-block;
  }

  .is-menuOpen .link {
    pointer-events: auto;
  }

  .linkLabel {
    display: inline-block;
    /* transform: translateY(100%); */
    transform-origin: left;

    @media (min-width: 640px) {
      transform: none;
    }
  }

  .is-menuAnimating .linkLabel {
    will-change: transform, opacity;
  }
</style>
