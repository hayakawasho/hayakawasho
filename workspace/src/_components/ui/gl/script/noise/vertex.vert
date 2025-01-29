precision mediump float;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}


// precision highp float;
//
// varying vec3 vPosition;
//
// void main() {
//   vPosition = position;
//   gl_Position = vec4(position, 1.0);
// }
