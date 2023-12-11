precision highp float;

#pragma glslify: cover = require('./../../../_glsl/cover');
#pragma glslify: PI = require('./../../../_glsl/pi');

uniform float thetaStart;
uniform float gapLength;
uniform float thetaLength;
uniform float imagesCount;
uniform float cylinderRadius;
uniform float cylinderHeight;
uniform float frameWidth;
uniform float imageWidth;

uniform sampler2D imageBackground;

varying vec3 vUv;

void main() {
  float angle = atan(vUv.x / cylinderRadius, vUv.z / cylinderRadius) + PI;
  float theta = thetaStart;

  float realAngle = mix(thetaStart - gapLength * 0.5, thetaStart + thetaLength + gapLength * 0.5, (angle - PI - thetaStart) / thetaLength)
  + gapLength * 0.5;

  vec2 uv = vec2(
    1.0 - (vUv.y + cylinderHeight * 0.5) / cylinderHeight, // 1.0 - (vUv.y + cylinderHeight * 0.5) / cylinderHeight,
    1.0 - mod(imagesCount * (realAngle / (PI * 2.0)), 1.0)
  );

  vec2 fittedUv = vec2(uv.x, uv.y);

  float width = imageWidth / frameWidth;

  if (width < 1.0) {
    float uvY = uv.y * width;
    fittedUv = vec2(uv.x, uvY + (1.0 - width) * 0.5);
  } else {
    float uvX = uv.x / width;
    fittedUv = vec2(uvX + (width - 1.0) * 0.5, uv.y);
  }

  gl_FragColor = texture2D(imageBackground, fittedUv);
}
