import type { ReadonlyRef } from "lake";
import type { BackCanvas, FrontCanvas } from "~/_components/ui/glworld";
import type PageScrollContext from "~/_components/ui/page-scroll";
import type { Object3D, Scene } from "~/_foundation/libs/three";

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<"push" | "pop">;
  backCanvasContext: ReturnType<(typeof BackCanvas)["setup"]>;
  frontCanvasContext: ReturnType<(typeof FrontCanvas)["setup"]>;
  scrollContext: ReturnType<(typeof PageScrollContext)["setup"]>;
};

export type ParentScene = {
  addScene: (child: Object3D) => Scene;
  removeScene: (child: Object3D) => Scene;
};

export type RouteName = "home" | "work" | "work-single" | "archives" | "error";
