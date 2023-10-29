import type GlContext from "../_components/glworld";
import type ScrollContext from "../_components/scroll-tween-container";
import type { ReadonlyRef } from "lake";

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<"push" | "pop">;
  mq: ReadonlyRef<"pc" | "sp">;
  glContext: ReturnType<(typeof GlContext)["setup"]>;
  scrollContext: ReturnType<(typeof ScrollContext)["setup"]>;
};

//----------------------------------------------------------------

export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};
