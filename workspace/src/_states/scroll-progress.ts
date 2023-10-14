import { map } from "nanostores";

const progress = map<{
  value: number;
}>({
  value: 0,
});

export const useScrollProgress = () => {
  const onMutate = (update: { value: number }) => {
    progress.set({ value: update.value });
  };

  const onProgress = () => {};

  return {
    onProgress,
    onMutate,
  } as const;
};
