import type { SvelteComponent } from "svelte";

export type FC = {
  init: any;
  destroy: any;
};

class WithSvelte {
  #app!: SvelteComponent;

  private constructor(private Svelte: typeof SvelteComponent) {}

  static connect(Svelte: typeof SvelteComponent): FC {
    return new WithSvelte(Svelte);
  }

  init(el: HTMLElement, props = {}) {
    this.#app = new this.Svelte({
      target: el,
      props,
    });
  }

  destroy() {
    this.#app.$destroy();
  }
}

const withSvelte = (Svelte: typeof SvelteComponent) => {
  return WithSvelte.connect(Svelte);
};

export { withSvelte };
