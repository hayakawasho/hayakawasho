// import { assert } from '../foundation'
import { selector as $$, define, require, lake } from "@/foundation";

import { withSvelte } from "./withSvelte";
import Sns from "./components/Sns/index.svelte";
import Glworld from "./components/Glworld/index.svelte";
// import Test from './components/Test/Test.svelte'
//

define("Sns", withSvelte(Sns));
define("Glworld", withSvelte(Glworld));

function componentFactory(name: string, Component: any) {
  define(name, () => {
    const component = new Component();

    return {
      init() {
        component.init();
      },
      destroy() {
        component.destroy();
      },
    };
  });
}

export function createComponents(ctx = document.body) {
  const children = $$("[data-component]", ctx).map((el) => {
    const componentName = el.dataset.component;
    const props = el.dataset.props ?? "{}";
    const json = JSON.parse(props);

    console.log(componentName, json);

    // return createComponent(modules[componentName as any], {
    //   ...json,
    //   el,
    // });
  });
}

export function createComponent(
  Component: any,
  context: {
    el: HTMLElement;
    domRefs: HTMLElement[];
  }
) {
  const { el, domRefs, ...props } = context;
  Component.init(el, props);

  return Component;
}
