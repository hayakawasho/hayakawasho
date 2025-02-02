import { mount, unmount } from "svelte";
import { defineComponent, useUnmount } from "lake";
import type { Component } from "svelte";
import type { RefElement } from "lake";

export type Context$<T = Record<string, unknown>> = T & {
  rootRef: RefElement;
};

export function withSvelte(SvelteComponent: Component, name = "withSvelte") {
  return defineComponent({
    name,
    setup(el, props) {
      const app = mount(SvelteComponent, {
        target: el,
        context: new Map<"$", Context$>([
          [
            "$",
            {
              rootRef: el,
              ...props,
            },
          ],
        ]),
      });

      useUnmount(() => {
        unmount(app);
      });
    },
  });
}
