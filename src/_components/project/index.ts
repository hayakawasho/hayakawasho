import {
  defineComponent,
  useDomRef,
  useSlot,
  useMount,
  useUnmount,
} from "lake";
import { Tween } from "@/_foundation/tween";
import Eyecatch from "./eyecatch";
// import H1 from "./h1";
import Screenshot from "./screenshot";
import type { GlobalContext } from "@/_foundation/type";

export default defineComponent({
  name: "project",
  setup(el, { glContext, initialMount, env }: GlobalContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<{
      h1: HTMLElement;
      screenshot: HTMLImageElement[];
      eyecatch: HTMLElement;
      infoHeading: HTMLElement | HTMLElement[];
      infoText: HTMLElement | HTMLElement[];
      next: HTMLElement;
    }>("h1", "screenshot", "eyecatch", "infoHeading", "infoText", "next");

    // addChild(refs.h1, H1, {
    //   glContext,
    // });
    addChild(refs.eyecatch, Eyecatch, {
      mq: env.mq,
    });
    addChild(refs.screenshot, Screenshot, {
      glContext,
      mq: env.mq,
    });

    useMount(() => {
      if (initialMount) {
        return;
      }

      Tween.serial(
        Tween.prop(refs.eyecatch, {
          alpha: 0,
        }),
        Tween.prop(refs.h1, {
          alpha: 0,
          y: "140%",
        }),
        Tween.prop([refs.infoHeading, refs.infoText], {
          y: "140%",
        }),
        Tween.wait(0.1),
        Tween.parallel(
          Tween.tween(refs.eyecatch, 0.55, "power3.inOut", {
            alpha: 1,
          }),
          Tween.tween(refs.infoHeading, 1.1, "expo.out", {
            stagger: 0.07,
            y: "0%",
          }),
          Tween.tween(refs.infoText, 1.1, "expo.out", {
            delay: 0.16,
            stagger: 0.07,
            y: "0%",
          }),
          Tween.tween(refs.h1, 0.45, "power2.inOut", {
            alpha: 1,
          }),
          Tween.tween(refs.h1, 1.4, "power3.out", {
            delay: 0.1,
            y: "0%",
          })
        )
      );
    });

    useUnmount(() => {
      Tween.parallel(
        Tween.tween(el, 0.55, "power3.inOut", {
          alpha: 0,
        }),
        Tween.tween(refs.h1, 0.45, "power3.inOut", {
          alpha: 0,
        }),
        Tween.tween(refs.h1, 1.05, "expo.out", {
          y: "-140%",
        })
      );
    });
  },
});
