import { useMount } from "lake";
import { useWindowSize } from "../../../../../../../_libs/lake/useWindowSize";
import {
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  Vector2,
} from "../../../../../../../_libs/three";
import { GlObject } from "../../../../../../../_webgl/object";
import { createTexture } from "../../../../../../../_webgl/texture";
import fragmentShader from "./fragment.fs";
import vertexShader from "./vertex.vs";

export function useHeroVisualPlane(el: HTMLElement) {
  const imgSrc = el.dataset.src;

  if (!imgSrc) {
    throw new Error("Image source is not defined");
  }

  const rect = el.getBoundingClientRect();
  const imgW = Number(el.dataset.width);
  const imgH = Number(el.dataset.height);

  console.log(rect, imgW, imgH);

  const uniforms = {
    uImageSize: {
      value: new Vector2(imgW, imgH),
    },
    uMeshSize: {
      value: new Vector2(rect.width, rect.height),
    },
    uTexture: {
      value: 0 as any,
    },
    uAlpha: {
      value: 1,
    },
  };

  createTexture(imgSrc).then((tex) => {
    uniforms.uTexture.value = tex;
  });

  const geo = new PlaneBufferGeometry(1, 1, 30, 30);
  const mat = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    transparent: true,
    alphaTest: 0.5,
    depthTest: false,
    uniforms,
  });

  const mesh = new Mesh(geo, mat);
  const plane = new GlObject(el);

  function setSize(width: number) {
    plane.resize(width);
    mesh.scale.set(plane.cache.bounds.width, plane.cache.bounds.height, 1);
  }

  useWindowSize(({ width }) => {
    setSize((width / 12) * 5 + width);
    console.log(plane.cache.bounds);
  });

  useMount(() => {
    plane.add(mesh);
    setSize((window.innerWidth / 12) * 5 + window.innerWidth);
  });

  return {
    plane,
    uniforms,
    setSize,
  };
}
