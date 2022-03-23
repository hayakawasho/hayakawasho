import { browserRouter, ProuterRequestCallback, ProuterGroup } from "prouter";
import { Do } from "@/foundation";

const router = Do(() => {
  const { use, processCurrentPath, listen } = browserRouter();

  return {
    route(path: string, callback: ProuterRequestCallback | ProuterGroup) {
      use(path, callback);
      return this;
    },
    exec: listen,
    reExec: processCurrentPath,
  };
});

export { router };
