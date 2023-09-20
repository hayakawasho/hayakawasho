precision mediump float;

#pragma glslify: PI = require('./../../../_glsl/pi')

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float u_velo;
// uniform float u_diff;

varying vec2 vUv;

void main() {
  vec4 pos = modelViewMatrix * vec4(position, 1.0);

  pos.y = pos.y + ((cos(uv.x * PI) * u_velo) * .125);
  // pos.y *= 1. - u_diff;
  // pos.x *= 1. - u_diff;

  vUv = uv;
  gl_Position = projectionMatrix * pos;
}
