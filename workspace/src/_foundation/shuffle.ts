export const shuffle = <T>(arr: T[]) => {
  const clone = Array.from(arr);

  for (let i = clone.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = clone[i];
    clone[i] = clone[r];
    clone[r] = tmp;
  }

  return clone;
};
