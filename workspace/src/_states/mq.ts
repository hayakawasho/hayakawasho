import { useUnmount, ref, readonly } from "lake";
import { atom } from "nanostores";
import { noop } from "@/_foundation/utils";

type MediaQuery = {
  device: "pc" | "sp";
  anyHover: boolean;
};

const mqState = atom<MediaQuery>({
  anyHover: true,
  device: "pc",
});

export const useMediaQueryContext = (callback: (payload: MediaQuery) => void = noop) => {
  const mq = ref<MediaQuery>(mqState.get());

  const unbind = mqState.listen(val => {
    mq.value = val;
    callback(val);
  });

  useUnmount(() => {
    unbind();
  });

  return readonly(mq).value;
};

export const mediaQueryMutators = mqState.set;
