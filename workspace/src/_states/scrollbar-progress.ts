import { useUnmount } from "lake";
import { map } from "nanostores";
import { noop } from "@/_foundation/utils";
import { useWindowSize } from "@/_states/window-size";

const progress = map<{
  now: number;
  pos: number;
}>({
  now: 0,
  pos: 0,
});

export const useScrollbarProgress = (
  callback: (payload: { now: number; pos: number }) => void = noop
) => {
  const [_wh, wh] = useWindowSize();

  const onScrollProgressMutate = (val: number, offset: number) => {
    progress.set({
      now: (val / (offset - wh.value)) * 100,
      pos: (val + wh.value) / offset,
    });
  };

  const unbind = progress.listen(({ now, pos }) => {
    callback({
      now,
      pos,
    });
  });

  useUnmount(() => {
    unbind();
  });

  return {
    onScrollProgressMutate,
  } as const;
};
