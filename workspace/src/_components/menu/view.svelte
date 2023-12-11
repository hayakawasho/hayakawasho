<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { useMouseoverSplitText } from '@/_foundation/hooks';
  import { useRoute } from '@/_states/route';
  import type { AppContext, RouteName } from '@/_foundation/type';
  import type { Context$ } from 'lake';

  const { mq, ...context } = getContext<
    Context$<
      AppContext & {
        current: RouteName;
      }
    >
  >('$');

  let current = context.current;

  useRoute(({ name }) => {
    current = name;
  });

  const linkProps = (to: string) => {
    return {
      ['hx-get']: to,
      ['hx-push-url']: true,
      ['hx-select']: '[data-xhr]',
      ['hx-swap']: 'swap:.45s',
      ['hx-target']: '#main',
    };
  };

  const VIEW = [...'View'];
  const ALL = [...'all'];
  const PROJECTS = [...'projects'];

  let refViewAllProjects: HTMLAnchorElement;
  let refsChar: HTMLElement[] = [];

  onMount(() => {
    useMouseoverSplitText(refViewAllProjects as HTMLElement, {
      chars: refsChar,
      mq: mq.value,
      stagger: 0.01,
    });
  });
</script>

<div class="menuLinkWrap" aria-hidden={current !== 'home'}>
  <a {...linkProps('/works/')} class="menuLink" href="/works/" bind:this={refViewAllProjects}>
    {#each VIEW as c, i}
      <span class="inline-block relative overflow-hidden" aria-hidden="true">
        <span class="inline-block" bind:this={refsChar[i]}>
          <span class="inline-block relative">{c}</span>
          <span class="inline-block absolute top-[100%] left-0">{c}</span>
        </span>
      </span>
    {/each}
    <span class="inline-block relative overflow-hidden w-[.25em]" aria-hidden="true" />
    {#each ALL as c, i}
      <span class="inline-block relative overflow-hidden" aria-hidden="true">
        <span class="inline-block" bind:this={refsChar[i + 4]}>
          <span class="inline-block relative">{c}</span>
          <span class="inline-block absolute top-[100%] left-0">{c}</span>
        </span>
      </span>
    {/each}
    <span class="inline-block relative overflow-hidden w-[.25em]" aria-hidden="true" />
    {#each PROJECTS as c, i}
      <span class="inline-block relative overflow-hidden" aria-hidden="true">
        <span class="inline-block" bind:this={refsChar[i + 7]}>
          <span class="inline-block relative">{c}</span>
          <span class="inline-block absolute top-[100%] left-0">{c}</span>
        </span>
      </span>
    {/each}
    <span class="text-[90%] ml-[.4em] mt-[.2em] transform rotate-90">↗</span>
    <span class="sr-only">View all projects</span>
  </a>
</div>

<style lang="postcss">
  .menuLinkWrap {
    position: fixed;
    left: calc(var(--grid) - 2rem);
    bottom: 3rem;
    z-index: 99;

    @media (min-width: 640px) {
      left: calc(var(--grid) - var(--gap) * 0.5 - 2rem);
      bottom: 5rem;
    }

    &[aria-hidden='true'] {
      visibility: hidden;
    }
  }

  .menuLink {
    font-size: 1.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    height: 100%;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    /* color: #fff;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.4)); */
    line-height: 1.3;

    @media (min-width: 640px) {
      font-size: 1.3rem;
    }
  }
</style>
