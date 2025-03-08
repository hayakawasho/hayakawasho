import type { ReadonlyRef } from "lake";

export type RouteName = "home" | "work-single";

export type DefineComponentContext = {
  history: ReadonlyRef<"push" | "pop">;
  anyHover: Readonly<"hover" | "none">;
  device: Readonly<"pc" | "sp">;
  once: Readonly<boolean>;
  prevRouteName: Readonly<RouteName>;
};
