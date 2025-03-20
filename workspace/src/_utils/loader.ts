import Pool from "../_libs/pool";

export function assetLoader<T>(src: string) {
  return new Promise<T>((resolve) => {
    const checkLoaded = Pool.pop<T>(src);

    if (checkLoaded) {
      return resolve(checkLoaded);
    }

    Pool.loadFile(src).then((result) => {
      return resolve(result);
    });
  });
}
