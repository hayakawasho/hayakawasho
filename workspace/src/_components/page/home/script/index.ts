import { defineComponent } from "lake";

export default defineComponent({
  name: "Home",
  setup(_el, context) {
    console.log("page:Home", context);
  },
});
