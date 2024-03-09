precision mediump float;

varying vec2 vUv;
varying vec4 v_worldPos;

void main () {
  vec3 pos = position;
  mat4 MVPM = projectionMatrix * modelViewMatrix;

  vUv = uv;
  gl_Position = MVPM * vec4(pos, 1.);
}
