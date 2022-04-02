import globals from "./global";
import { loader } from "./loader";
import {
  AFTER_PAGE_READY,
  PJAX_LEAVE,
  PJAX_ENTER,
  LOADING_DONE,
  LOADING_TIMEOUT,
} from "@/const";
import { eventbus, router } from "@/foundation";
import { match } from "ts-pattern";

const manifest = [
  {
    id: "hoge",
    src: "#",
  },
];

export type Manifest = typeof manifest;

export interface IScene {
  enter(scope?: HTMLElement): Promise<unknown>;
  leave(): Promise<unknown> | void;
  scope: HTMLElement;
}

class SceneManager {
  private static _instance = new SceneManager();

  #pjaxIsStarted = false;
  #scope!: HTMLElement;
  #newScene!: IScene;

  private constructor() {
    const doneLoading = () => {
      document.body.classList.replace("is-domLoading", "is-domLoaded");
    };

    eventbus.on(LOADING_TIMEOUT, () => {
      doneLoading();
    });

    eventbus.on(LOADING_DONE, () => {
      doneLoading();
    });

    eventbus.on(PJAX_LEAVE, async ({ from }) => {
      const oldScene = this.#newScene;
      oldScene.leave();
    });

    eventbus.on(PJAX_ENTER, ({ to }) => {
      const namespace = to.dataset.routerView;
      document.body.dataset.page = namespace;
      window.scrollTo(0, 0);

      this.#scope = to;
      router.reExec();
    });
  }

  static create() {
    return SceneManager._instance;
  }

  async #once(scene: IScene) {
    const now = performance.now();

    loader.loadStart(now, manifest);

    globals();

    await Promise.all([
      import("lazysizes"),
      import("@/components/Pjax"),
      scene.enter(),
    ]);

    this.#newScene = scene;
  }

  goto(scene: IScene) {
    match(this.#pjaxIsStarted)
      .with(true, async () => {
        await scene.enter(this.#scope);
        this.#newScene = scene;
      })
      .with(false, async () => {
        await this.#once(scene);
        this.#pjaxIsStarted = true;
      })
      .exhaustive();

    eventbus.emit(AFTER_PAGE_READY);
  }
}

const createSceneManager = () => {
  return SceneManager.create();
};

export { createSceneManager };
