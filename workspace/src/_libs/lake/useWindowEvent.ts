import { useEvent } from "lake";

export const useWindowEvent = <T extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(
  eventType: T,
  listener: Parameters<typeof useEvent<any, T>>[2],
  optionsOrUseCapture?: Parameters<typeof useEvent>[3],
) => {
  return useEvent(window as any, eventType, listener, optionsOrUseCapture);
};
