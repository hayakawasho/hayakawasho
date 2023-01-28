precision highp float;

#pragma glslify: random2d = require('./random2d.glsl')
#pragma glslify: circle = require('./circle.glsl')
#pragma glslify: rect = require('./rect.glsl')

uniform sampler2D uSamplerOut;
uniform sampler2D uSamplerIn;
uniform vec2 uResolution;
uniform float uAmount;
uniform float uAlpha;
uniform float uBlur;
uniform float uTime;
uniform float uRad;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
  vec2 uv2 = -1. + 1. * gl_FragCoord.xy / uResolution.xy;
  uv2.x *= uResolution.x / uResolution.y;

  vec4 visualIn = texture2D(uSamplerIn, vUv);
  vec4 visualOut = texture2D(uSamplerOut, vUv);

  vec2 coord = vec2(0.);

  // cloud
  coord = vec2(.2, -.5);
  visualIn.rgb += circle(uColor, uRad * 1.25, uBlur, coord, uv2) * (uAlpha * .75);
  visualOut.rgb += circle(uColor, uRad * 1.25, uBlur, coord, uv2) * (uAlpha * .75);

  coord = vec2(-2., .1);
  visualIn.rgb += circle(uColor, uRad * 2., uBlur, coord, uv2) * (uAlpha * 1.);
  visualOut.rgb += circle(uColor, uRad * 2., uBlur, coord, uv2) * (uAlpha * 1.);


  vec3 mask = vec3(0.);
  float mixf = clamp(mask.r, 0.0, .0);

  vec3 color = mix(visualOut, visualIn, mixf).rgb;

  // noise
  float b = random2d(vUv * 200.0 + uTime);
  color += b * uAmount;

  gl_FragColor = vec4(color, 1.0);
}
