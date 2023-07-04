precision highp float;

float PI = 3.1415926535897932384626433832795;

float easeOutCubic(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}

float easeInCubic(float t) {
  return t * t * t;
}

vec3 hsv2rgb(float h, float s, float v){
  vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
  return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

varying vec2 vUv;
uniform float time;

void main() {
  vec3 color = hsv2rgb(
    cos(time * PI / 45.0) * easeOutCubic(vUv.x),
    easeInCubic(vUv.x) * 2.5,
    1.0
  );
	gl_FragColor = vec4(color, 1.0);
}