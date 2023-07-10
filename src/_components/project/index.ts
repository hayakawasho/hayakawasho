import {
  defineComponent,
  useDomRef,
  useSlot,
  useMount,
  useUnmount,
} from "lake";
import Eyecatch from "./eyecatch";
// import H1 from "./h1";
// import Screenshot from "./screenshot";
import { Tween } from "@/_foundation/tween";
import type { GlobalContext } from "@/_foundation/type";

export default defineComponent({
  name: "project",
  setup(el, { glContext, initialMount }: GlobalContext) {
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
    // addChild(refs.screenshot, Screenshot, {
    //   glContext,
    // });
    addChild(refs.eyecatch, Eyecatch);

    useMount(() => {
      if (initialMount) {
        return;
      }

      Tween.serial(
        Tween.prop(refs.eyecatch, {
          alpha: 0,
        }),
        Tween.prop(refs.h1, {
          y: "80%",
          alpha: 0,
        }),
        Tween.prop([refs.infoHeading, refs.infoText], {
          y: "110%",
        }),
        Tween.parallel(
          Tween.tween(refs.eyecatch, 0.6, "power3.inOut", {
            alpha: 1,
          }),
          Tween.tween(refs.infoHeading, 1.2, "expo.out", {
            stagger: 0.1,
            y: "0%",
          }),
          Tween.tween(refs.infoText, 1.2, "expo.out", {
            stagger: 0.1,
            y: "0%",
            delay: 0.1,
          }),
          Tween.tween(refs.h1, 0.55, "power2.inOut", {
            alpha: 1,
          }),
          Tween.tween(refs.h1, 1.65, "expo.out", {
            y: "0%",
            delay: 0.1,
          })
        )
      );
    });

    useUnmount(() => {
      Tween.parallel(
        Tween.tween(el, 0.6, "power3.inOut", {
          alpha: 0,
        }),
        Tween.tween(refs.h1, 0.45, "power3.inOut", {
          alpha: 0,
        }),
        Tween.tween(refs.h1, 1.15, "expo.out", {
          y: "-70%",
        })
      );
    });
  },
});
