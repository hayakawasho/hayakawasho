precision mediump float;

uniform sampler2D uNoiseTexture;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec4 noise = texture2D(uNoiseTexture, uv);
  noise.a = uAlpha;

  gl_FragColor = noise;
}
