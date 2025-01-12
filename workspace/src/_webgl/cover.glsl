vec2 cover(vec2 screenSize, vec2 imageSize, vec2 uv) {
  vec2 ratio = vec2(
    min((screenSize.x / screenSize.y) / (imageSize.x / imageSize.y), 1.0),
    min((screenSize.y / screenSize.x) / (imageSize.y / imageSize.x), 1.0)
  );

  uv = vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  return uv;
}

#pragma glslify: export(cover)
