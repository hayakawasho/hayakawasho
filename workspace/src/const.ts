import type { ReadonlyRef } from "lake";
import type { useThree } from "./_libs/lake/useThree";

export type RouteName = "home" | "work-single";

type GlContext = Pick<ReturnType<typeof useThree>, "addScene" | "removeScene" | "setRenderTarget">;

export type DefineComponentContext = {
  history: ReadonlyRef<"push" | "pop">;
  anyHover: Readonly<"hover" | "none">;
  device: Readonly<"pc" | "sp">;
  dpr: Readonly<number>;
  once: Readonly<boolean>;
  prevRouteName: Readonly<RouteName>;
  glBackContext: Readonly<GlContext>;
  glFrontContext: Readonly<GlContext>;
};
