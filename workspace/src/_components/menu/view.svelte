<script lang="ts">
  import { getContext } from "svelte";
  import { useRoute } from "@/_states/route";
  import type { AppContext, RouteName } from "@/_foundation/type";
  import type { Context$ } from "lake";

  const { mq, ...context } = getContext<
    Context$<
      AppContext & {
        current: RouteName;
      }
    >
  >("$");

  let current = context.current;

  useRoute(({ name }) => {
    current = name;
  });

  const linkProps = (to: string) => {
    return {
      ["hx-get"]: to,
      ["hx-push-url"]: true,
      ["hx-select"]: "[data-xhr]",
      ["hx-swap"]: "swap:.5s",
      ["hx-target"]: "#main",
    };
  };
</script>

<div class="menuLinkWrap" aria-hidden={current !== 'home'}>
  <a
    {...linkProps("/works/")}
    class="menuLink"
    href="/works/"
  >
    View all projects
  </a>
</div>

<style lang="postcss">
  .menuLinkWrap {
    --w: 15rem;
    --h: 3.6rem;

    position: fixed;
    left: 50%;
    bottom: 4rem;
    width: var(--w);
    height: var(--h);
    transform: translateX(-50%);
    z-index: 99;

    @media (min-width: 640px) {
      --w: 18rem;
      --h: 4rem;
      bottom: 6rem;
    }

    &[aria-hidden="true"] {
      visibility: hidden;
    }
  }

  .menuLink {
    font-size: 1.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    color: #fff;
    filter: drop-shadow(0 0 10px rgba(0,0,0,.4));

    @media (min-width: 640px) {
      font-size: 1.3rem;
    }
  }
</style>
