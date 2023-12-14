precision mediump float;

#pragma glslify: cover = require('./../../../_glsl/cover')

uniform sampler2D u_texture;
uniform vec2 u_mesh_size;
uniform vec2 u_image_size;

uniform float u_opacity;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 texUv = cover(u_mesh_size, u_image_size, uv);
  vec4 tex = texture2D(u_texture, texUv);
  tex.a = u_opacity;

  gl_FragColor = tex;
}
