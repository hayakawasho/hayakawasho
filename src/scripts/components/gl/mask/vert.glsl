precision mediump float;

mat2 scale2d(vec2 _scale) {
  return mat2(_scale.x,0.0,0.0,_scale.y);
}
attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
uniform vec2 uScale;

void main() {
  vec3 pos = position;
  vec2 scale = uScale;

  pos.xy *= scale2d( vec2( scale ) );
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
