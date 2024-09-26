precision highp float;

uniform sampler2D uTexture;

uniform float uAlpha;
uniform float uVelo;
uniform float uProgress;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec4 transparent = vec4(0., 0., 0., 0.);
  vec4 texture = texture2D(uTexture, uv);
  float t = step(uv.x, uAlpha);
  vec4 color = mix(transparent, texture, t);

  gl_FragColor = color;
}
