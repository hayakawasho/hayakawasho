import { Camera } from "ogl";
import { deg2rad } from "@/_foundation/math";
import type { OGLRenderingContext } from "ogl";

export const createCamera = (gl: OGLRenderingContext, w: number, h: number) => {
  const FOV = 45;

  const calcDistance = (h: number) => {
    const fovRad = deg2rad(FOV * 0.5);
    const dist = (h * 0.5) / Math.tan(fovRad);

    return {
      dist,
    };
  };

  const { dist } = calcDistance(h);
  const camera = new Camera(gl, {
    aspect: w / h,
    far: 10000,
    fov: FOV,
    near: 0.1,
  });

  camera.position.z = dist;

  return {
    calcDistance,
    camera,
  };
};
