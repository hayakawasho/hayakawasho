import {
  defineComponent,
  // useSlot,
  // useDomRef,
  useMount,
  useUnmount,
} from "lake";
import type { GlobalContext } from "@/_foundation";

export default defineComponent({
  setup(_el, props: GlobalContext) {
    // const { glContext } = props
    //
    // const { refs } = useDomRef<{ plane: HTMLImageElement[] }>('plane')
    // const { addChild, removeChild: _ } = useSlot()

    useMount(() => {
      if (props.initialLoad) {
        return;
      }
      //
    });

    useUnmount(() => {
      //
    });
  },
  tagName: "Home",
});
