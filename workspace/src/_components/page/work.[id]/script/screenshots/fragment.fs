precision mediump float;

#include ../../../../../_webgl/cover;

uniform sampler2D uTexture;
uniform vec2 uMeshSize;
uniform vec2 uImageSize;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 texUv = cover(uMeshSize, uImageSize, uv);
  vec4 tex = texture2D(uTexture, texUv);

  tex.a *= uAlpha;
  gl_FragColor = tex;
}
