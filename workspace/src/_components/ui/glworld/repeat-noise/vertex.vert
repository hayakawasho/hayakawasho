precision mediump float;

varying vec2 vUv;
uniform float uRepeat;

void main() {
  vUv = uv * uRepeat;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
