precision mediump float;

#pragma glslify: PI = require('./../../../_glsl/pi')

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float u_velo;

varying vec2 vUv;

void main() {
  vec3 pos = position;

  // pos.y *= 1. - u_velo * 0.1;
  // pos.x *= 1. - u_velo * 0.1;

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
