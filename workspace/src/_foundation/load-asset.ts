import Pool from "./pool";

export const loadAsset = <T>(src: string) => {
  return new Promise<T>((resolve) => {
    const checkLoaded = Pool.pop<T>(src);

    if (checkLoaded) {
      resolve(checkLoaded);
    } else {
      Pool.loadFile(src).then((result) => {
        resolve(result);
      });
    }
  });
};
