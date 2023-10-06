import { gsap } from "gsap";
import type { RefElement } from "lake";

export const zeroPadding = (num: number, p = 2) => {
  return num.toString().padStart(p, "0");
};

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

export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.decode().then(() => {
      return resolve(img);
    });
  });
};

export const qsa = <T extends RefElement>(q: string, scope?: RefElement): T[] =>
  Array.from((scope ?? document).querySelectorAll(q));
