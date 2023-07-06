import type { TierResult } from "detect-gpu";
import type { OGLRenderingContext, Transform } from "ogl";

export type GlobalContext = {
  initialMount: boolean;
  glContext: {
    gl: OGLRenderingContext;
    addScene: (scene: Transform) => void;
    removeScene: (scene: Transform) => void;
  };
  scrollContext: {
    pause: () => void;
    resume: () => void;
    update: () => void;
    scrollTo: (y: number) => void;
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
