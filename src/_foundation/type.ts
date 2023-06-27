import type { TierResult } from "detect-gpu";
import type { OGLRenderingContext, Transform } from "ogl";

export type GlobalContext = {
  initialLoad: boolean;
  // scrollContext: {
  //   resume: () => void
  //   pause: () => void
  //   update: () => void
  //   scrollTo: (href: string) => void
  // }
  glContext: {
    gl: OGLRenderingContext;
    addScene: (scene: Transform) => void;
    removeScene: (scene: Transform) => void;
  };
  env: {
    mq: "pc" | "sp";
    gpuTier?: TierResult;
  };
};

export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};
