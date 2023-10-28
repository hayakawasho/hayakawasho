precision mediump float;

#pragma glslify: cover = require('./../../../_glsl/cover');

uniform sampler2D u_texture;
uniform vec2 u_mesh_size;
uniform vec2 u_image_size;

uniform float u_velo;
uniform float u_scale;
uniform float u_alpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 texCenter = vec2(0.5);
  vec2 texUv = cover(u_mesh_size, u_image_size, uv);
  vec2 texScale = (texUv - texCenter) * u_scale + texCenter;
  vec4 texture = texture2D(u_texture, texUv);

  texScale.y += 0.6 * u_velo;

  if(uv.y < 1.) {
    texture.g = texture2D(u_texture, texScale).g;
  }

  texScale.y += 0.4 * u_velo;

  if(uv.y < 1.) {
    texture.b = texture2D(u_texture, texScale).b;
  }

  gl_FragColor = vec4(texture.rgb, u_alpha);
}
