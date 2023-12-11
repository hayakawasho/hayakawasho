precision highp float;

#pragma glslify: cover = require('./../../../_glsl/cover');

uniform sampler2D u_texture;

uniform float u_alpha;

uniform vec2 u_mesh_size;
uniform vec2 u_image_size;
uniform vec2 u_scale;
uniform vec2 u_offset;
uniform vec2 u_clipTop;
uniform vec2 u_clipBottom;

varying vec2 vUv;

const float torn = 0.05;

void main() {
  vec2 uv_cover = cover(u_mesh_size, u_image_size, vUv);

  vec2 resize = 1.0 / u_scale;
  vec2 scaleOffset = resize * (u_scale - 1.0) * 0.5;
  vec2 uv_scale = uv_cover * resize + scaleOffset + u_offset;
  vec2 uv_repeat = vec2( uv_scale.x, uv_scale.y );

  if(uv_repeat.x > 1.0) {
    uv_repeat.x = 2.0 - uv_repeat.x;
  }

  if(uv_repeat.x < 0.0) {
    uv_repeat.x = -1.0 * uv_repeat.x;
  }

  if(uv_repeat.y > 1.0) {
    uv_repeat.y = 2.0 - uv_repeat.y;
  }

  if(uv_repeat.y < 0.0) {
    uv_repeat.y = -1.0 * uv_repeat.y;
  }

  vec4 tex = texture2D(u_texture, uv_repeat);
  tex.a = u_alpha;

  if(1.0 - u_clipTop.y < vUv.y && u_clipBottom.y > vUv.y) {
    gl_FragColor = tex;
  }
}
