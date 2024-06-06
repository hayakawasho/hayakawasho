float mapRange(float val, float oldMin, float oldMax, float newMin, float newMax) {
  float old = oldMax - oldMin;
  float new = newMax - newMin;
  return (((val - oldMin) * new) / old) + newMin;
}

#pragma glslify: export(mapRange)
