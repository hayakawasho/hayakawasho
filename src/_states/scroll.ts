import { ref } from "lake";
import { map } from "nanostores";
import type { Point } from "@/_foundation";

const pos = map<Point>({
  x: 0,
  y: 0,
});

export const scrollPositionGetters = () => pos.get();

export const scrollPositionMutators = (update: { x?: number; y?: number }) => {
  const prev = pos.get();

  pos.set({
    ...prev,
    ...update,
  });
};

export const scrollPositionRef = ref(pos);
