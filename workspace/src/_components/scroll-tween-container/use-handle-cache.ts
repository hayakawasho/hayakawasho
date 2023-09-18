import { useWindowSize } from "@/_states/window-size";

export type Cache = {
  el: HTMLElement;
  parent?: Cache;
  top: number;
  bottom: number;
  offset: number;
  speed: number;
  out: boolean;
  transform: number;
};

export const useHandleCache = () => {
  const [_ww, wh] = useWindowSize();

  const getBounds = (el: HTMLElement, speed: number) => {
    const rect = el.getBoundingClientRect();
    const center = wh.value / 2 - rect.height / 2;
    const offset =
      rect.top < wh.value
        ? 0
        : (rect.top - center) * speed - (rect.top - center);
    const top = rect.top + offset;
    const bottom = rect.bottom + offset;

    return {
      bottom,
      offset,
      top,
    };
  };

  const createCache = (targets: HTMLElement[]) => {
    return targets.reduce<Cache[]>((acc, el) => {
      const speed = 1;
      const { top, bottom, offset } = getBounds(el, speed);

      acc.push({
        bottom,
        el,
        offset,
        out: true,
        speed,
        top,
        transform: 0,
      });

      el.style.transform = "translate3d(0, 0, 0)";

      return acc;
    }, []);
  };

  const updateCache = (cache: Cache[]) => {
    return cache.map((item) => {
      const { top, bottom, offset } = getBounds(item.el, item.speed);

      return {
        ...item,
        bottom,
        offset,
        top,
      };
    });
  };

  return {
    createCache,
    updateCache,
  };
};
