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
import Screenshot from "./screenshot";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  now: HTMLElement;
  max: HTMLElement;
  dash: HTMLElement;
  text: HTMLElement[];
  h1: HTMLElement;
  screenshot: HTMLImageElement[];
  eyecatch: HTMLElement;
  infoText: HTMLElement[];
  infoLine: HTMLElement;
  stack: HTMLElement | HTMLElement[];
  next: HTMLElement;
};

export default defineComponent({
  name: "Work",
  setup(el, context: AppContext) {
    const { once } = context;
    const { addChild } = useSlot();

    const { refs } = useDomRef<Refs>(
      "now",
      "max",
      "dash",
      "text",
      "h1",
      "screenshot",
      "eyecatch",
      "infoText",
      "infoLine",
      "stack",
      "next"
    );

    addChild(refs.eyecatch, Eyecatch, context);
    addChild(refs.screenshot, Screenshot, context);
    addChild(refs.next, NextProject, context);

    useMount(() => {
      if (once) {
        return;
      }

      Tween.serial(
        Tween.prop(refs.now, {
          willChange: "transform",
          x: "-110%",
        }),
        Tween.prop(refs.dash, {
          scaleX: 0,
          willChange: "transform",
        }),
        Tween.prop(refs.max, {
          willChange: "transform",
          x: "110%",
        }),
        Tween.prop([refs.infoText, refs.stack], {
          willChange: "transform",
          y: "110%",
        }),
        Tween.prop(refs.infoLine, {
          opacity: 0,
          scaleY: 0,
          willChange: "transform,opacity",
        }),
        Tween.prop(refs.text, {
          willChange: "transform",
          y: "1.2em",
        }),
        Tween.wait(0.1),
        Tween.parallel(
          Tween.tween([refs.now, refs.max], 0.85, "power2.out", {
            x: "0%",
          }),
          Tween.tween(refs.dash, 1.2, "expo.out", {
            scaleX: 1,
          }),
          Tween.tween(refs.infoText, 1.85, "expo.out", {
            stagger: 0.05,
            y: "0%",
          }),
          Tween.tween(refs.stack, 1.85, "expo.out", {
            stagger: 0.05,
            y: "0%",
          }),
          Tween.tween(refs.infoLine, 1.2, "expo.out", {
            opacity: 1,
            scaleY: 1,
          }),
          Tween.tween(refs.text, 1.3, "custom.out", {
            stagger: 0.05,
            y: "0%",
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
              refs.text,
            ],
            {
              clearProps: "will-change",
            }
          );
        })
      );
    });

    useUnmount(() => {
      Tween.parallel(
        Tween.tween(refs.text, 0.4, "custom.in", {
          y: "-1.2em",
        }),
        Tween.tween(el, 0.55, "power3.inOut", {
          alpha: 0,
        })
      );
    });
  },
});
