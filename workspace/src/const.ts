import type { ReadonlyRef } from "lake";

export type RouteName = "home" | "work-single";

export type DefineComponentContext = {
  history: ReadonlyRef<"push" | "pop">;
  once: boolean;
  prevRouteName: RouteName;
};
