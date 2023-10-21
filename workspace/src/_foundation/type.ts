import type GlContext from "../_components/glworld";
import type ScrollContext from "../_components/scroll-tween-container";
import type { TierResult } from "detect-gpu";
import type { ReadonlyRef } from "lake";

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<"pushstate" | "popstate">;
  gpuTier: ReadonlyRef<TierResult>;
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
