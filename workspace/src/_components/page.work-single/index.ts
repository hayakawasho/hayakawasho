import { defineComponent, useDomRef, useSlot, useMount } from "lake";
import { useMouseoverSplitText } from "~/_foundation/hooks";
import { splitTextNode2Words } from "~/_foundation/split-text";
import { Tween } from "~/_foundation/tween";
import { waitFrame } from "~/_foundation/utils";
import { useWindowSizeContext } from "~/_states/window-size";
import Eyecatch from "./eyecatch";
import Screenshots from "./screenshots";
import type { AppContext } from "~/_foundation/type";

type Refs = {
  back: HTMLElement;
  c: HTMLElement[];
  now: HTMLElement;
  max: HTMLElement;
  dash: HTMLElement;
  h1: HTMLElement;
  date: HTMLElement;
  screenshots: HTMLElement;
  eyecatch: HTMLElement;
  infoText: HTMLElement[];
  infoLine: HTMLElement;
  stack: HTMLElement | HTMLElement[];
  next: HTMLElement;
};

export default defineComponent({
  name: "WorkSingle",
  setup(_el, context: AppContext) {
    const { once, history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>(
      "back",
      "c",
      "now",
      "max",
      "dash",
      "h1",
      "date",
      "screenshots",
      "eyecatch",
      "infoText",
      "infoLine",
      "stack",
      "next",
    );

    const { split, onSplitUpdate } = splitTextNode2Words(refs.h1);

    useWindowSizeContext(() => {
      onSplitUpdate();
    });

    addChild(refs.eyecatch, Eyecatch, context);
    addChild(refs.screenshots, Screenshots, context);
    // addChild(refs.next, NextProject, context);

    useMouseoverSplitText(refs.back, {
      chars: refs.c,
    });

    useMount(() => {
      if (!once && history.value === "push") {
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
          Tween.prop([refs.infoText, refs.stack, refs.date], {
            willChange: "transform",
            y: "110%",
          }),
          Tween.prop(refs.infoLine, {
            opacity: 0,
            scaleY: 0,
            willChange: "transform,opacity",
          }),
          Tween.prop([split.words], {
            willChange: "transform",
            y: "1.2em",
          }),
          Tween.prop(refs.c, {
            willChange: "transform",
            y: "100%",
          }),
          Tween.wait(0.1),
          Tween.parallel(
            Tween.tween([refs.now, refs.max], 0.85, "power2.out", {
              x: "0%",
            }),
            Tween.tween(refs.dash, 1.2, "expo.out", {
              scaleX: 1,
            }),
            Tween.tween([refs.infoText], 1.85, "expo.out", {
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
            Tween.tween([split.words], 2.1, "expo.out", {
              delay: 0.05,
              stagger: 0.03,
              y: "0em",
            }),
            Tween.tween([refs.date], 1.6, "expo.out", {
              delay: 0.25,
              y: "0%",
            }),
            Tween.tween(refs.c, 1.85, "expo.out", {
              y: "0%",
            }),
          ),
          Tween.immediate(() => {
            Tween.prop(
              [
                refs.date,
                refs.now,
                refs.max,
                refs.dash,
                refs.c,
                refs.infoText,
                refs.stack,
                refs.infoLine,
                split.words,
              ],
              {
                clearProps: "will-change",
              },
            );
          }),
        );
      }

      return async () => {
        if (history.value === "push") {
          Tween.kill(refs.c);
          Tween.prop(refs.c, {
            willChange: "transform",
            y: "-100%",
          });
          Tween.prop(
            [refs.dash, refs.max, refs.now, refs.infoText, refs.stack, split.words, refs.date],
            {
              willChange: "transform",
            },
          );

          await waitFrame();

          Tween.parallel(
            Tween.tween([refs.infoLine], 0.55, "power3.inOut", {
              alpha: 0,
            }),
            Tween.tween(refs.c, 0.45, "custom.in", {
              y: "-240%",
            }),
            Tween.tween(
              [refs.dash, refs.max, refs.now, refs.infoText, refs.stack, split.words, refs.date],
              0.45,
              "custom.in",
              {
                y: "-1.2em",
              },
            ),
          );
        }
      };
    });
  },
});
