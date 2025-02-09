import { defineComponent, useDomRef, useEvent, useSlot } from "lake";
import { Tween } from "../../../../_libs/tween";
import { waitFrame } from "../../../../_utils/wait";
import InfoDialog from "./info/dialog";
import InfoTrigger from "./info/trigger";

type Refs = {
  infoTrigger: HTMLButtonElement;
  infoTriggerLabel: HTMLElement;
  infoDialog: HTMLDialogElement;
  infoDialogTitle: HTMLElement;
  infoDialogContent: HTMLElement;
  infoDialogBackground: HTMLElement;
  infoText: HTMLElement[];
  title: HTMLElement;
};

export default defineComponent({
  name: "WorkSingle",
  setup(_el, context) {
    console.log("WorkSingle:", context);

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>(
      "infoTrigger",
      "infoTriggerLabel",
      "infoDialog",
      "infoDialogTitle",
      "infoDialogContent",
      "infoDialogBackground",
      "infoText",
      "title",
    );

    addChild(refs.infoTrigger, InfoTrigger);
    addChild(refs.infoDialog, InfoDialog);

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
          Tween.tween(refs.title, .8, "expo.out", {
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
  },
});
