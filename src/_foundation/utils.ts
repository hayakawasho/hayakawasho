import { gsap } from "gsap";

export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    gsap.to(
      {
        val: 0,
      },
      {
        duration: time,
        onComplete: resolve,
        val: 1,
      }
    );
  });
};

export const nextTick = (): Promise<void> => {
  return new Promise((resolve) => gsap.ticker.add(() => resolve(), true));
};

export const debounce = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay = 250
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
};

export const searchParamsToString = (q: Record<string, any>) => {
  const params = new URLSearchParams(q);
  return params.toString();
};

export const noop = () => {
  //
};
