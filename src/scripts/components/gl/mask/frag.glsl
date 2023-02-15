precision highp float;

uniform float uProgress;
uniform float uPower;

uniform bool uOut;

vec4 transparent = vec4(0., 0., 0., 0.);
vec4 black = vec4(0., 0., 0., 1.);

#pragma glslify: PI = require("../../../libs/glsl/pi.glsl")

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  uv.y -= ((sin(uv.x * PI) * uPower) * .25);

  if (!uOut) uv.y = 1. - uv.y;

  float t = smoothstep(uv.y - fwidth(uv.y), uv.y, uProgress);
  vec4 color = mix(transparent, black, t);

  gl_FragColor = color;
}
