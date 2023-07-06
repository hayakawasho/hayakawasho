precision mediump float;

#pragma glslify: cover = require('./../../../_glsl/cover')

uniform sampler2D uTexture;
uniform vec2 uMeshSize;
uniform vec2 uImageSize;
uniform float uVelo;
uniform float uScale;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 texCenter = vec2(0.5);
  vec2 texUv = cover(uMeshSize, uImageSize, uv);
  vec2 texScale = (texUv - texCenter) * uScale + texCenter;
  vec4 texture = texture2D(uTexture, texScale);

  texScale.y += 0.15 * uVelo;
  if(uv.y < 1.) texture.g = texture2D(uTexture, texScale).g;

  texScale.y += 0.10 * uVelo;

  if(uv.y < 1.) texture.b = texture2D(uTexture, texScale).b;

  gl_FragColor = texture;
}