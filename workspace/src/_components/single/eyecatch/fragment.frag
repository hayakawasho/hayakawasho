precision highp float;

varying vec2 vUv;
varying vec4 v_worldPos;

uniform sampler2D u_texture;
uniform float u_opacity;
uniform float u_scale;
uniform float u_innerY;
uniform float u_screenCenterTexture;
uniform vec2 u_size;

vec2 scaleOrigin = vec2(0.5, 0.5);

void main() {
  vec2 uv = vUv;
  uv.y += u_innerY;
  uv.x += u_innerX;

  vec2 screenCenter = (v_worldPos.xy / u_size) + 0.5;
  uv = screenCenter * (0. + u_screenCenterTexture) + uv * (1. - u_screenCenterTexture);

  vec4 color = texture2D(u_texture, vec2(vec2(uv - scaleOrigin) / u_scale + scaleOrigin));
  gl_FragColor = color;
}
