precision mediump float;

varying vec2 vUv;
varying vec4 v_worldPos;
varying vec2 ssCoords;
uniform float u_progress;
uniform float u_depth;
uniform float u_bend;

void main () {
  vec3 pos = position;
  v_worldPos = modelMatrix * vec4(position, 1.);

  mat4 MVPM = projectionMatrix * modelViewMatrix;
  vec4 originalPosition = MVPM * vec4(position, 1.);
  ssCoords = vec2(originalPosition.xy / originalPosition.w);

  float startAt = uv.y - 0.5;
  float finishAt = uv.y;
  float bend = smoothstep(startAt, finishAt, 1. - u_progress);

  pos.x *= 1. + (bend * .1) * abs(ssCoords.x) * u_bend;
  pos.z += ((1. - u_progress + 0.5) * u_depth);

  vUv = uv;
  gl_Position = MVPM * vec4(pos, 1.);
}
