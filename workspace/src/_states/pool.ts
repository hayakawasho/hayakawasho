export default new (class {
  #loadQueue: createjs.LoadQueue;
  #pool: Record<string, any>;

  constructor() {
    this.#pool = {};

    this.#loadQueue = new createjs.LoadQueue();
    this.#loadQueue.setMaxConnections(6);

    this.#loadQueue.addEventListener("fileload", (e: any) => {
      this.#pool[e.item.id] = e.result;
    });
  }

  loadFile = (src: string) => {
    return new Promise<any>(resolve => {
      this.#loadQueue.loadFile({ id: src, src });

      const onComplete = () => {
        this.#loadQueue.removeEventListener("complete", onComplete);
        const result = this.#loadQueue.getResult(src);
        return resolve(result);
      };

      this.#loadQueue.addEventListener("complete", onComplete);
    });
  };

  loadManifest = (
    manifest: {
      src: string;
      id: string;
    }[]
  ) => {
    return new Promise<void>(resolve => {
      this.#loadQueue.loadManifest(manifest);

      const onComplete = () => {
        this.#loadQueue.removeEventListener("complete", onComplete);
        return resolve();
      };

      this.#loadQueue.addEventListener("complete", onComplete);
    });
  };

  pop<T>(id: string): T | undefined {
    return this.#pool[id];
  }
})();
