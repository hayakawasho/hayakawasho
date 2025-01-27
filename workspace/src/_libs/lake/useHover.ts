import { useEvent } from "lake";
import { useMediaQuery } from "../../_stores/mq";

export function useHover(target: HTMLElement, handler: (evt: HTMLElementEventMap["mouseenter"]) => void) {
  const { anyHover } = useMediaQuery();

  useEvent(target, "mouseenter", (evt) => {
    if (!anyHover) {
      return;
    }
    handler(evt);
  });
}
