import { getGPUTier } from "detect-gpu";
import { defineComponent, useDomRef as _, useSlot as __, useMount } from "lake";
import { wideQuery } from "@/_foundation";
// import Gl from '../gl'
import type { GlobalContext } from "@/_foundation";

// type Refs = {
//   main: HTMLElement;
//   glWorld: HTMLElement;
// };

type Props = {
  onCreated: (props?: Omit<GlobalContext, "initialLoad">) => void;
  onUpdated: (
    scope: HTMLElement,
    props?: Omit<GlobalContext, "initialLoad">
  ) => void;
  onCleanup: (scope: HTMLElement) => void;
};

export default defineComponent({
  setup(_el, { onCreated }: Props) {
    // const { addChild } = useSlot()
    // const { refs } = useDomRef<Refs>('glWorld', 'main')

    const env: GlobalContext["env"] = {
      gpuTier: undefined,
      mq: wideQuery.matches ? "pc" : "sp",
    };

    getGPUTier().then((res) => (env.gpuTier = res));

    // const [gl] = addChild(refs.glWorld, Gl)

    const provides = {
      env,
      glContext: undefined,
    };

    useMount(() => {
      onCreated(provides as any);
    });
  },
  tagName: "Loader",
});
