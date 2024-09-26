precision mediump float;

varying vec2 vUv;
varying vec4 vWorldPos;
varying vec2 ssCoords;
uniform float uProgress;
uniform float uDepth;
uniform float uBend;

void main () {
  vec3 pos = position;
  vWorldPos = modelMatrix * vec4(position, 1.);

  mat4 MVPM = projectionMatrix * modelViewMatrix;
  vec4 originalPosition = MVPM * vec4(position, 1.);
  ssCoords = vec2(originalPosition.xy / originalPosition.w);

  float startAt = uv.y - 0.5;
  float finishAt = uv.y;
  float bend = smoothstep(startAt, finishAt, 1. - uProgress);

  pos.x *= 1. + (bend * .1) * abs(ssCoords.x) * uBend;
  pos.z += ((1. - uProgress + 0.5) * uDepth);

  vUv = uv;
  gl_Position = MVPM * vec4(pos, 1.);
}
