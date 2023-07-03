import { defineComponent } from "lake";
import type { GlobalContext } from "@/_foundation/type";

type Props = Pick<GlobalContext, "glContext">;

export default defineComponent({
  name: "project.parallax",
  setup(_el, { glContext: _ }: Props) {
    //
  },
});
