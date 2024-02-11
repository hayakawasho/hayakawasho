import { defineComponent, useSlot, useDomRef } from "lake";
import { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import fragment from "./fragment.frag";
import ScreenshotItem from "./item";
import vertex from "./vertex.vert";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  screenshotItem: HTMLImageElement[];
};

export default defineComponent({
  name: "Screenshots",
  setup(_el: HTMLElement, context: AppContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("screenshotItem");

    const geo = new PlaneBufferGeometry(1, 1, 4, 20);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    addChild(refs.screenshotItem, ScreenshotItem, {
      ...context,
      geo,
      mat,
    });
  },
});
