precision mediump float;

varying vec2 vUv;
uniform float u_repeat;

void main() {
  vUv = uv * u_repeat;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
