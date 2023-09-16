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
import NextProject from "./next";
// import Screenshot from "./screenshot";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  now: HTMLElement;
  max: HTMLElement;
  dash: HTMLElement;
  // h1: HTMLElement;
  screenshot: HTMLImageElement[];
  eyecatch: HTMLElement;
  infoText: HTMLElement[];
  infoLine: HTMLElement;
  stack: HTMLElement | HTMLElement[];
  next: HTMLElement;
  start: HTMLElement;
};

export default defineComponent({
  name: "project",
  setup(el, context: AppContext) {
    const { env, once } = context;
    const { addChild } = useSlot();

    const { refs } = useDomRef<Refs>(
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
      "start"
    );

    addChild(refs.eyecatch, Eyecatch, context);
    // addChild(refs.screenshot, Screenshot, context);
    addChild(refs.next, NextProject, context);

    useMount(() => {
      if (once) {
        return;
      }

      Tween.prop(refs.now, {
        x: "-110%",
        willChange: "transform",
      });
      Tween.prop(refs.dash, {
        scaleX: 0,
        willChange: "transform",
      });
      Tween.prop(refs.max, {
        x: "110%",
        willChange: "transform",
      });
      Tween.prop([refs.infoText, refs.stack], {
        y: "110%",
        willChange: "transform",
      });

      switch (env.mq) {
        case "pc":
          Tween.serial(
            Tween.prop(refs.infoLine, {
              scaleX: 0,
              opacity: 0,
              willChange: "transform,opacity",
            }),
            Tween.wait(0.1),
            Tween.parallel(
              Tween.tween([refs.now, refs.max], 0.75, "power2.out", {
                x: "0%",
              }),
              Tween.tween(refs.dash, 1.1, "expo.out", {
                scaleX: 1,
              }),
              Tween.tween([refs.infoText, refs.stack], 1.85, "expo.out", {
                y: "0%",
                stagger: 0.05,
              }),
              Tween.tween(refs.infoLine, 0.75, "expo.out", {
                scaleX: 1,
                opacity: 1,
                delay: 1,
              })
            ),
            Tween.immediate(() => {
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
            })
          );
          break;
        case "sp":
          Tween.serial(
            Tween.prop(refs.infoLine, {
              scaleY: 0,
              opacity: 0,
              willChange: "transform,opacity",
            }),
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
              }),
              Tween.tween(refs.infoLine, 1.2, "expo.out", {
                scaleY: 1,
                opacity: 1,
              })
            ),
            Tween.immediate(() => {
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
            })
          );
          break;
        default:
          break;
      }
    });

    useUnmount(() => {
      Tween.parallel(
        Tween.tween(el, 0.55, "power3.inOut", {
          alpha: 0,
        })
      );
    });
  },
});
