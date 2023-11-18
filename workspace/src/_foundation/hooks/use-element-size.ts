import { useMount } from "lake";
import { debounce } from "@/_foundation/utils";

export const useElementSize = <T extends Element>(
  targetOrTargets: T | T[],
  callback: (payload: {
    aspect: number;
    width: number;
    height: number;
  }) => void,
  debounceTime = 200
) => {
  const ro = new ResizeObserver(
    debounce(([entry]) => {
      const { width, height } = entry.contentRect;
      const aspect = width / height;

      callback({
        aspect,
        height,
        width,
      });
    }, debounceTime)
  );

  const watch = (targetOrTargets: T | T[]) => {
    if (Array.isArray(targetOrTargets)) {
      targetOrTargets.forEach((el) => ro.observe(el));
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
};
