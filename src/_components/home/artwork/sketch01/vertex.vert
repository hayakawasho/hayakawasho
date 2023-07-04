#pragma glslify: snoise = require(glsl-noise/simplex/3d)

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
varying float noise;
uniform float time;
uniform vec2 resolution;

const float amplitude1 = 0.5;

const float speed = 0.5;

void main() {
  vUv = uv;
  noise = snoise(vec3(normal * amplitude1 + time * speed));

  vec3 p = position + normal * noise * 3.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}