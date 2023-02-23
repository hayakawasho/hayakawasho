#define PI 3.14159265359

precision highp float;

uniform float uAspectRatio;
uniform float uTsDir;
uniform float uPageFront;
uniform float uPageBack;
uniform float uPageBackAlpha;
uniform vec2 uResWin;
uniform vec2 uMoveUv;
uniform vec2 uMaskSinRatio;

const float MSK_S_STR = 0.25;
const vec2 DEF_WIN_S = vec2( 1440., 767. );

float tsMsk( vec2 uv ) {
  float mskSinStr = MSK_S_STR /  (uResWin.y / DEF_WIN_S.y);
  float mskSinWinRt = (uResWin.x / (DEF_WIN_S.x));

  float msk = uMoveUv.y;
  float mskSin = sin(uv.x * PI) * uMaskSinRatio.x;

  mskSin *= mskSinStr;
  mskSin *= mskSinWinRt;
  return mskSin += msk;
}

void main() {
  vec2 res = uResWin;

  vec2 fUv = gl_FragCoord.xy / res;
  float tsMskSin = tsMsk( fUv );

  vec4 c;
  vec4 cW = vec4( vec3(1.0),1.0);
  vec4 cB = vec4(	vec3(0.0),1.0);

  vec4 cBk = mix( cB, cW, uPageBack );
  vec4 cFr = mix( cB, cW, uPageFront);

  cBk.a = uPageBackAlpha;

  c = mix( cBk, cFr, vec4( step( abs(uTsDir - fUv.y), tsMskSin ) ));
  gl_FragColor = c;
}
