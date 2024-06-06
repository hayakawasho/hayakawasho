precision mediump float;

uniform sampler2D u_noiseTex;
uniform float u_alpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec4 noise = texture2D(u_noiseTex, uv);
  noise.a = u_alpha;

  gl_FragColor = noise;
}
