import type { TierResult } from "detect-gpu";
import type ScrollContext from "../_components/scroll-tween-container";
import type GlContext from "../_components/glworld";

export type AppContext = {
  once: boolean;
  glContext: ReturnType<(typeof GlContext)["setup"]>;
  scrollContext: ReturnType<(typeof ScrollContext)["setup"]>;
  env: {
    mq: "pc" | "sp";
    gpuTier?: TierResult;
  };
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
