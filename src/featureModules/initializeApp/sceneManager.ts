import modular from 'modujs'
import * as modules from '../modules'
import globals from './global'
import { loader } from './loader'
import {
  AFTER_PAGE_READY,
  PJAX_LEAVE,
  PJAX_ENTER,
  LOADING_DONE,
  LOADING_TIMEOUT,
} from '@/const'
// import { g } from '@/env'
import { bus, router } from '@/lib'

const manifest = [
  {
    id: 'hoge',
    src: '#',
  },
]

export type Manifest = typeof manifest

export interface IScene {
  enter(scope?: HTMLElement): Promise<unknown>
  leave(): Promise<unknown> | void
  scope: HTMLElement
}

const app = new modular({ modules })

class SceneManager {
  private static _instance = new SceneManager()

  #pjaxIsStarted = false
  #scope!: HTMLElement
  #newScene!: IScene

  constructor() {
    const doneLoading = () => {
      document.body.classList.replace('is-domLoading', 'is-domLoaded')
    }

    bus.on(LOADING_TIMEOUT, () => {
      doneLoading()
    })

    bus.on(LOADING_DONE, () => {
      doneLoading()
    })

    bus.on(PJAX_LEAVE, async ({ from }) => {
      const oldScene = this.#newScene
      oldScene.leave()

      app.destroy(from)
    })

    bus.on(PJAX_ENTER, ({ to }) => {
      const namespace = to.dataset.routerView
      document.body.dataset.page = namespace
      window.scrollTo(0, 0)

      app.update(to)

      this.#scope = to
      router.processCurrentPath()
    })
  }

  static create() {
    return SceneManager._instance
  }

  #once = async (scene: IScene) => {
    const now: number = performance.now()
    loader.loadStart(now, manifest)

    globals()
    app.init(app)

    await Promise.all([
      // import('current-device'),
      import('lazysizes'),
      import('@/featureModules/pjax'),
      scene.enter(),
    ])

    this.#newScene = scene
  }

  goto = async (scene: IScene) => {
    if (!this.#pjaxIsStarted) {
      await this.#once(scene)
      this.#pjaxIsStarted = true
    } else {
      await scene.enter(this.#scope)
      this.#newScene = scene
    }

    bus.emit(AFTER_PAGE_READY)
  }
}

const createSceneManager = () => {
  return SceneManager.create()
}

export { createSceneManager }
