import { defineComponent } from "lake";

export default defineComponent({
  name: "WorkSingle",
  setup(_el, context) {
    console.log("WorkSingle:", context);
  },
});
