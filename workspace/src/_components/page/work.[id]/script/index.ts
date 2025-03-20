import { defineComponent, useDomRef, useMount, useSlot } from "lake";
import { useElementSize } from "../../../../_libs/lake/useElementSize";
import { useThree } from "../../../../_libs/lake/useThree";
import type { DefineComponentContext } from "../../../../const";
import Info from "./info";
import PcScreenShots from "./screenshots/pc";
import SpScreenShots from "./screenshots/sp";

type Refs = {
  screenshots: HTMLElement;
  glWorkSingle: HTMLCanvasElement;
};

export default defineComponent({
  name: "WorkSingle",
  setup(el, props: DefineComponentContext) {
    const { device, dpr } = props;

    const { refs } = useDomRef<Refs>("screenshots", "glWorkSingle");

    const { addChild } = useSlot();

    const { setSize, ...glContext } = useThree(refs.glWorkSingle, dpr);

    useElementSize(refs.glWorkSingle, ({ width, height }) => {
      setSize(width, height, width / height);
    });

    if (device === "sp") {
      addChild(el, Info, props);
      addChild(refs.screenshots, SpScreenShots, props);
    } else {
      addChild(refs.screenshots, PcScreenShots, {
        ...props,
        glFrontContext: glContext,
      });
    }

    useMount(() => {
      return () => {
        console.log("unmount:WorkSingle", props);
      };
    });
  },
});
