import { defineComponent, useSlot, useDomRef, useMount, useUnmount } from "lake";
import { useTick } from "~/_foundation/hooks";
import { Object3D } from "~/_foundation/libs/three";
import { lerp, mapRange } from "~/_foundation/math";
import { useWindowSize } from "~/_states/window-size";
import { Tween } from "~/_foundation/libs/tween";
import { waitFrame } from "~/_foundation/utils";
// import Entry from "./entry";
import WorkThumbs from "./thumbs";
// import { useInfiniteScroll } from "./use-infinite-scroll";
import type { AppContext } from "~/_foundation/types";

type Refs = {
  workThumb: HTMLElement[];
  workItems: HTMLElement;
  workItem: HTMLElement[];
  // scrollItem: HTMLElement[];
  workTitle: HTMLElement[];
  workNo: HTMLElement[];
};

export default defineComponent({
  name: "Work",
  setup(el: HTMLElement, context: AppContext) {
    const { backCanvasContext, once, history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("workThumb", "workItems", "workItem", "workTitle", "workNo");

    // const infiniteScrollContext = useInfiniteScroll(el);

    useWindowSize(({ windowSize }) => {
      // state.centerX = windowWidth * 0.5;
      // state.centerY = windowHeight * 0.5;
    });

    const state = {
      // centerX: ww.value * 0.5,
      // centerY: wh.value * 0.5,
      // lastX: 0,
      // lastY: 0,
    };

    const parentScene = new Object3D();

    addChild(refs.workThumb, WorkThumbs, context);

    // addChild(refs.entry, Entry, {
    //   ...context,
    //   // infiniteScrollContext,
    //   parentScene,
    // });

    // addChild(refs.entry, Entry, {
    //   ...context,
    //   // infiniteScrollContext,
    //   parentScene,
    // });

    useMount(() => {
      if (once || history.value === "pop") {
        return;
      }

      Tween.serial(
        Tween.prop(refs.workTitle, {
          willChange: "transform",
          y: "1.2em",
        }),
        Tween.wait(0.1),
        Tween.parallel(
          // Tween.tween(refs.workNo, 1.6, "expo.out", {
          //   delay: 0.25,
          //   y: "0%",
          // }),
          Tween.tween(refs.workTitle, 1.8, "expo.out", {
            stagger: 0.02,
            y: "0em",
          }),
        ),
        Tween.immediate(() => {
          Tween.prop([refs.workNo, refs.workTitle], {
            clearProps: "will-change",
          });
        }),
      );
    });

    useUnmount(() => {
      if (history.value === "pop") {
        return;
      }

      (async () => {
        Tween.kill(refs.workTitle);
        Tween.prop([refs.workNo, refs.workTitle], {
          willChange: "transform",
        });

        await waitFrame();

        Tween.tween([refs.workNo, refs.workTitle], 0.4, "custom.in", {
          y: "-1.1em",
        });
      })();
    });
  },
});
