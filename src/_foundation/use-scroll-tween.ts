import { scrollPositionRef } from "@/_states/scroll";
import { useWatch } from "./use-watch";

export const useScrollTween = (
  callback: (payload: { currentY: number }) => void
) => {
  useWatch(scrollPositionRef, ({ y }) => {
    callback({ currentY: y });
  });
};
