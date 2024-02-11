export const map = (
  val: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) => {
  if (val <= inputMin) return outputMin;
  if (val >= inputMax) return outputMax;

  const p = (outputMax - outputMin) / (inputMax - inputMin);

  return (val - inputMin) * p + outputMin;
};
