import { defineComponent, useDomRef, useEvent, useSlot } from "lake";
import InfoDialog from "./info/dialog";
import InfoTrigger from "./info/trigger";

type Refs = {
  infoTrigger: HTMLButtonElement;
  infoDialog: HTMLDialogElement;
};

export default defineComponent({
  name: "WorkSingle",
  setup(_el, context) {
    console.log("WorkSingle:", context);

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("infoTrigger", "infoDialog");

    addChild(refs.infoTrigger, InfoTrigger);
    addChild(refs.infoDialog, InfoDialog);

    let isOpen = false;

    const closeDialog = () => {
      refs.infoDialog.close();
      isOpen = false;
    };

    const openDialog = () => {
      isOpen = true;
      refs.infoDialog.show();
    };

    useEvent(refs.infoTrigger, "click", (e) => {
      e.preventDefault();
      isOpen ? closeDialog() : openDialog();
    });
  },
});
