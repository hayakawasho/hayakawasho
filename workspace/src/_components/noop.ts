import { defineComponent } from "lake";

export default defineComponent({
  name: "Noop",
  setup(_el) {
    console.log("Hello");
  },
});
