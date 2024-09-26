import { useEvent } from "lake";
import { useMediaQuery } from "~/_states/mq";

export const useHover = (target: HTMLElement, handler: (evt: HTMLElementEventMap["mouseenter"]) => void) => {
  const { anyHover } = useMediaQuery();

  useEvent(target, "mouseenter", (evt) => {
    if (!anyHover) {
      return;
    }
    handler(evt);
  });
};
