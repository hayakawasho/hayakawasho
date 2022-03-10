import { createSceneManager } from './sceneManager'
import { DefaultPage } from '@/components/page'
import { router } from '@/lib'

export function init() {
  const sceneManager = createSceneManager()

  router
    .use('*', _req => {
      // sceneManager.goto(new DefaultPage())
    })

  router.listen()
}
