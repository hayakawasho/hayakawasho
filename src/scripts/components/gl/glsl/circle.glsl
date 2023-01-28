vec3 circle (vec3 col, float rad, float blur, vec2 pos, vec2 uv) {
  float dis = length(uv - pos);

  return col * (1. - smoothstep(rad * blur, rad, dis));
}

#pragma glslify: export(circle)

// float circle(vec2 uv, float radius, float blur){
// 	return 1.-smoothstep(
//     radius - (radius * blur),
//     radius + (radius * blur),
//     dot(uv,uv) * 4.0
//   );
// }
//
// #pragma glslify: export(circle)
