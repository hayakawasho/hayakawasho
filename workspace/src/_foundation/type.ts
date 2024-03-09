import type { ReadonlyRef } from "lake";
import type GlContext from "~/_components/gl";
import type ScrollContext from "~/_components/scroll-tween-container";

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<"push" | "pop">;
  backCanvasContext: ReturnType<(typeof GlContext)["setup"]>;
  frontCanvasContext: ReturnType<(typeof GlContext)["setup"]>;
  scrollContext: ReturnType<(typeof ScrollContext)["setup"]>;
};

export type RouteName = "home" | "works" | "works-single" | "archives";

//----------------------------------------------------------------

export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};
