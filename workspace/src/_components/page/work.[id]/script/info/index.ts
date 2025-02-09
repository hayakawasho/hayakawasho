import { defineComponent, useDomRef, useEvent, useSlot } from "lake";
import { useTick } from "../../../../../_libs/lake/useTick";
import { useElementSize } from "../../../../../_libs/lake/useElementSize";
import { Tween } from "../../../../../_libs/tween";
import { waitFrame } from "../../../../../_utils/wait";
import InfoScroll from "./scroll";

export default defineComponent({
  name: "Info",
  setup() {
    const { refs } = useDomRef<{
      infoTrigger: HTMLButtonElement;
      infoTriggerLabel: HTMLElement;
      infoDialog: HTMLDialogElement;
      infoDialogTitle: HTMLElement;
      infoDialogBackground: HTMLElement;
      infoText: HTMLElement[];
      infoDialogContent: HTMLElement;
      infoScrollItem: HTMLElement[];
      title: HTMLElement;
    }>(
      "infoTrigger",
      "infoTriggerLabel",
      "infoDialog",
      "infoDialogTitle",
      "infoDialogBackground",
      "infoText",
      "infoDialogContent",
      "infoScrollItem",
      "title",
    );

    const { addChild } = useSlot();

    const infoScrollContext = addChild(refs.infoScrollItem, InfoScroll);

    let isOpen = false;

    const closeDialog = async () => {
      Tween.kill([refs.infoDialogTitle, refs.infoText, refs.infoDialogBackground, refs.title, refs.infoTriggerLabel]);

      Tween.prop(refs.infoDialogBackground, {
        willChange: "opacity",
      });
      Tween.prop([refs.infoDialogTitle, refs.infoText], {
        willChange: "transform",
      });

      await waitFrame();

      Tween.parallel(
        Tween.tween([refs.infoTriggerLabel, refs.title], 1, "expo.out", {
          yPercent: 0,
        }),
        Tween.serial(
          Tween.parallel(
            Tween.tween([refs.infoDialogTitle, refs.infoText], 0.5, "power2.out", {
              yPercent: 120,
            }),
            Tween.tween(refs.infoDialogBackground, 0.5, "power2.out", {
              opacity: 0,
            }),
          ),
          Tween.wait(0, () => {
            Tween.prop([refs.infoDialogTitle, refs.infoText, refs.infoDialogBackground], {
              clearProps: "will-change",
            });

            isOpen = false;

            infoScrollContext.forEach((i) => i.current.onReset());
            refs.infoDialog.close();
          }),
        ),
      );
    };

    const openDialog = async () => {
      isOpen = true;
      refs.infoDialog.show();

      Tween.kill([refs.infoDialogTitle, refs.infoText, refs.infoDialogBackground, refs.title, refs.infoTriggerLabel]);

      Tween.prop([refs.infoDialogTitle, refs.infoText], {
        // MEMO: safariのaタグ位置バグ対応
        clearProps: "transform",
      });
      Tween.prop(refs.infoDialogBackground, {
        opacity: 0,
        willChange: "opacity",
      });
      Tween.prop([refs.infoDialogTitle, refs.infoText], {
        yPercent: 100,
        willChange: "transform",
      });

      await waitFrame();

      Tween.serial(
        Tween.parallel(
          Tween.tween(refs.infoDialogBackground, 0.65, "power2.out", {
            opacity: 1,
          }),
          Tween.tween(refs.infoDialogTitle, 0.8, "custom.out", {
            yPercent: 0,
          }),
          Tween.tween(refs.infoTriggerLabel, 1.2, "expo.out", {
            yPercent: -100,
          }),
          Tween.tween(refs.title, 1, "expo.out", {
            yPercent: 100,
          }),
          Tween.tween(refs.infoText, 0.65, "custom.out", {
            yPercent: 0,
            stagger: 0.02,
          }),
        ),
        Tween.wait(0, () => {
          Tween.prop([refs.infoDialogTitle, refs.infoText, refs.infoDialogBackground], {
            clearProps: "will-change",
          });
        }),
      );
    };

    useEvent(refs.infoTrigger, "click", (e) => {
      e.preventDefault();
      isOpen ? closeDialog() : openDialog();
    });

    let infoDialogContentHeight = 0;
    let windowHeight = 0;

    useElementSize(refs.infoDialogContent, ({ height }) => {
      infoDialogContentHeight = height;
      windowHeight = window.innerHeight;
    });

    useTick(({ deltaRatio }) => {
      if (!isOpen) {
        return;
      }

      infoScrollContext.forEach((i) => i.current.onUpdate({ deltaRatio, infoDialogContentHeight, windowHeight }));
    });
  },
});
