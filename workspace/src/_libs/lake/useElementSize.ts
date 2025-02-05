import { useMount } from "lake";
import { debounce } from "../../_utils/debounce";

export function useElementSize<T extends Element>(
  targetOrTargets: T | T[],
  callback: (payload: Size) => void,
  debounceTime = 200,
) {
  const ro = new ResizeObserver(
    debounce(([entry]) => {
      const { width, height } = entry.contentRect;

      callback({
        height,
        width,
      });
    }, debounceTime),
  );

  const watch = (targetOrTargets: T | T[]) => {
    if (Array.isArray(targetOrTargets)) {
      for (const el of targetOrTargets) {
        ro.observe(el);
      }
    } else {
      ro.observe(targetOrTargets);
    }
  };

  useMount(() => {
    watch(targetOrTargets);

    return () => {
      ro.disconnect();
    };
  });

  const unwatch = (el: T) => {
    ro.unobserve(el);
  };

  return {
    unwatch,
  };
}
