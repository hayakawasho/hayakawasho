import { defineComponent, useDomRef, useSlot, useMount, useUnmount } from "lake";
import { useStaggerHoverText } from "~/_foundation/hooks";
import { Tween } from "~/_foundation/libs/tween";
import { waitFrame, splitTextNode2Words } from "~/_foundation/utils";
import { useWindowSize } from "~/_states/window-size";
import Kv from "./kv";
import Screenshots from "./screenshots";
import type { AppContext } from "~/_foundation/types";

type Refs = {
  back: HTMLElement;
  c: HTMLElement[];
  now: HTMLElement;
  max: HTMLElement;
  dash: HTMLElement;
  h1: HTMLElement;
  date: HTMLElement;
  screenshots: HTMLElement;
  kv: HTMLElement;
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
      "infoText",
      "infoLine",
      "stack",
      "kv",
      "screenshots",
      "next",
    );

    const { split, onSplitUpdate } = splitTextNode2Words(refs.h1);

    useWindowSize(() => {
      onSplitUpdate();
    });

    useStaggerHoverText(refs.back, refs.c, {});

    addChild(refs.kv, Kv, context);
    addChild(refs.screenshots, Screenshots, context);
    // addChild(refs.next, NextProject, context);

    useMount(() => {
      if (once || history.value === "pop") {
        return;
      }

      Tween.serial(
        Tween.prop(refs.now, {
          willChange: "transform",
          xPercent: -110,
        }),
        Tween.prop(refs.dash, {
          scaleX: 0,
          willChange: "transform",
        }),
        Tween.prop(refs.max, {
          willChange: "transform",
          xPercent: 110,
        }),
        Tween.prop([refs.infoText, refs.stack, refs.date], {
          willChange: "transform",
          yPercent: 110,
        }),
        Tween.prop(refs.infoLine, {
          opacity: 0,
          scaleY: 0,
          willChange: "transform,opacity",
        }),
        Tween.prop(split.words, {
          willChange: "transform",
          y: "1.1em",
        }),
        Tween.prop(refs.c, {
          willChange: "transform",
          yPercent: 100,
        }),
        Tween.wait(0.1),
        Tween.parallel(
          Tween.tween([refs.now, refs.max], 1, "power3.out", {
            xPercent: 0,
          }),
          Tween.tween(refs.dash, 1.2, "expo.out", {
            scaleX: 1,
          }),
          Tween.tween([refs.infoText], 1.8, "expo.out", {
            stagger: 0.07,
            yPercent: 0,
          }),
          Tween.tween(refs.stack, 1.8, "expo.out", {
            stagger: 0.07,
            yPercent: 0,
          }),
          Tween.tween(refs.infoLine, 1.2, "expo.out", {
            opacity: 1,
            scaleY: 1,
          }),
          Tween.tween(split.words, 2, "expo.out", {
            delay: 0.05,
            stagger: 0.03,
            y: "0em",
          }),
          Tween.tween([refs.date], 1.6, "expo.out", {
            delay: 0.25,
            yPercent: 0,
          }),
          Tween.tween(refs.c, 1.85, "expo.out", {
            yPercent: 0,
          }),
        ),
        Tween.immediate(() => {
          Tween.prop(
            [refs.date, refs.now, refs.max, refs.dash, refs.c, refs.infoText, refs.stack, refs.infoLine, split.words],
            {
              clearProps: "will-change",
            },
          );
        }),
      );
    });

    useUnmount(() => {
      if (history.value === "pop") {
        return;
      }

      (async () => {
        Tween.kill(refs.c);
        Tween.prop(refs.c, {
          willChange: "transform",
          // yPercent: -110,
        });
        Tween.prop([refs.dash, refs.max, refs.now, refs.infoText, refs.stack, split.words, refs.date], {
          willChange: "transform",
        });

        await waitFrame();

        Tween.parallel(
          Tween.tween([refs.infoLine], 0.55, "power3.inOut", {
            alpha: 0,
          }),
          Tween.tween(refs.c, 0.45, "custom.in", {
            yPercent: -240,
          }),
          Tween.tween(
            [refs.dash, refs.max, refs.now, refs.infoText, refs.stack, split.words, refs.date],
            0.4,
            "custom.in",
            {
              y: "-1.1em",
            },
          ),
        );
      })();
    });
  },
});
