import { router } from './router'
import { createSceneManager } from './sceneManager'
import { DefaultPage } from '../../page'

export function init() {
  const sceneManager = createSceneManager()
  router
    .use('*', _req => {
      sceneManager.goto(new DefaultPage())
    })

  router.listen()
}