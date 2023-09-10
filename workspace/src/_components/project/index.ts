import {
  defineComponent,
  useDomRef,
  useSlot,
  useMount,
  useUnmount,
} from "lake";
// import { SplitText } from "@/_foundation/split-text";
import { Tween } from "@/_foundation/tween";
import Eyecatch from "./eyecatch";
import NextEyecatch from "./next";
// import Screenshot from "./screenshot";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "project",
  setup(el, context: AppContext) {
    const { addChild } = useSlot();

    const { refs } = useDomRef<{
      now: HTMLElement;
      max: HTMLElement;
      dash: HTMLElement;
      h1: HTMLElement;
      screenshot: HTMLImageElement[];
      eyecatch: HTMLElement;
      infoText: HTMLElement[];
      infoLine: HTMLElement;
      stack: HTMLElement | HTMLElement[];
      next: HTMLElement;
      nextImage: HTMLImageElement;
    }>(
      "now",
      "max",
      "dash",
      // "h1",
      "screenshot",
      "eyecatch",
      "infoText",
      "infoLine",
      "stack",
      "next",
      "nextImage"
    );

    addChild(refs.eyecatch, Eyecatch, context);
    // addChild(refs.screenshot, Screenshot, context);
    addChild(refs.nextImage, NextEyecatch, context);

    useMount(() => {
      // if (context.once) {
      //   return;
      // }

      Tween.serial(
        Tween.prop(refs.now, {
          x: "-110%",
          willChange: "transform",
        }),
        Tween.prop(refs.dash, {
          scaleX: 0,
          willChange: "transform",
        }),
        Tween.prop(refs.max, {
          x: "110%",
          willChange: "transform",
        }),
        Tween.prop(refs.infoLine, {
          scaleY: 0,
          opacity: 0,
          willChange: "transform,opacity",
        }),
        Tween.prop([refs.infoText, refs.stack], {
          y: "110%",
          willChange: "transform",
        }),
        // Tween.prop(refs.eyecatch, {
        //   alpha: 0,
        // }),
        // Tween.prop(refs.h1, {
        //   alpha: 0,
        //   y: "140%",
        //   scale: 1.1,
        // }),
        // Tween.prop([refs.infoHeading, refs.infoText], {
        //   y: "140%",
        // }),
        Tween.wait(0.1),
        Tween.parallel(
          Tween.tween([refs.now, refs.max], 0.75, "power2.out", {
            x: "0%",
          }),
          Tween.tween(refs.dash, 1.1, "expo.out", {
            scaleX: 1,
          }),
          Tween.tween(refs.infoText, 1.85, "expo.out", {
            y: "0%",
            stagger: 0.05,
          }),
          Tween.tween(refs.stack, 1.85, "expo.out", {
            y: "0%",
            stagger: 0.05,
            onComplete: () => {
              Tween.prop(
                [
                  refs.now,
                  refs.max,
                  refs.dash,
                  refs.infoText,
                  refs.stack,
                  refs.infoLine,
                ],
                {
                  clearProps: "will-change",
                }
              );
            },
          }),
          Tween.tween(refs.infoLine, 1.2, "expo.out", {
            scaleY: 1,
            opacity: 1,
          })
          // Tween.tween(refs.infoHeading, 1.1, "expo.out", {
          //   stagger: 0.07,
          //   y: "0%",
          // }),
          // Tween.tween(refs.infoText, 1.1, "expo.out", {
          //   delay: 0.16,
          //   stagger: 0.07,
          //   y: "0%",
          // }),
          // Tween.tween(refs.h1, 0.45, "power2.inOut", {
          //   alpha: 1,
          // }),
          // Tween.tween(refs.h1, 1.4, "power3.out", {
          //   delay: 0.1,
          //   scale: 1,
          //   y: "0%",
          // })
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
