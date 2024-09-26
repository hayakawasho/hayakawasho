mat2 sheerY(float a) {
  return mat2(1.,0.,tan(a),1.);
}

#pragma glslify: export(sheerY)
