import { defineComponent, useSlot, useDomRef } from "lake";
import { PlaneBufferGeometry, ShaderMaterial } from "~/_foundation/libs/three";
import fragmentShader from "./fragment.frag";
import ScreenshotItem from "./screenshot-item";
import vertexShader from "./vertex.vert";
import type { AppContext } from "~/_foundation/types";

type Refs = {
  screenshotItem: HTMLImageElement[];
};

export default defineComponent({
  name: "Screenshots",
  setup(_el: HTMLElement, context: AppContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("screenshotItem");

    const geo = new PlaneBufferGeometry(2, 2, 4, 20);
    const mat = new ShaderMaterial({
      fragmentShader,
      vertexShader,
    });

    addChild(refs.screenshotItem, ScreenshotItem, {
      ...context,
      geo,
      mat,
    });
  },
});
