precision highp float;

uniform float uVelo;
uniform float uProgress;

varying vec2 vUv;

#define M_PI 3.1415926535897932384626433832795

void main(){
  vec3 pos = position;

  float activation = (+uv.x-uv.y+1.)/2.;

  float latestStart = .75;
  float startAt = activation * latestStart;
  float vertexProgress = smoothstep(startAt, 1., uProgress);

  pos.y = pos.y + ((sin(uv.x * (M_PI / 1.5)) * -uVelo) * 0.05) - (.5 * (1. - uProgress));
  pos.x *= 1. + (.35 * (1. - vertexProgress));

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
