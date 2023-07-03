import { defineComponent } from "lake";
import type { GlobalContext } from "@/_foundation/type";

type Props = Pick<GlobalContext, "glContext">;

export default defineComponent({
  name: "project.h1",
  setup(el, { glContext: _ }: Props) {
    const { h1 } = el.dataset;

    console.log(h1);
  },
});
