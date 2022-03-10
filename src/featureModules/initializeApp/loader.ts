import type { Manifest } from './sceneManager'
import { LOADING_PROGRESS, LOADING_TIMEOUT, LOADING_DONE } from '@/const'
import { TWEEN, bus } from '@/lib'
import { Util } from '@/utils'

const TIMEOUT = 4000

const state = {
  clock: 0,
  isTimeOuted: false,
  progress: {
    now: 0,
    before: 0,
  },
}

const handleProgress = (e: any) => {
  TWEEN.tween(state.progress, 0.3, null, {
    now: (e.progress as number) * 100,
  })
    .onUpdate(() => {
      if (state.progress.now <= state.progress.before) {
        return
      }

      const progress = Math.round(state.progress.now)
      state.progress.before = progress

      bus.emit(LOADING_PROGRESS, { progress })
    })
    .play()
}

const handleFileLoaed = (e: any) => {
  const elapsedTime = performance.now() - state.clock

  if (elapsedTime > TIMEOUT && !state.isTimeOuted) {
    state.isTimeOuted = true

    bus.emit(LOADING_TIMEOUT, {
      id: e.item.id,
      timeout: elapsedTime,
    })

    e.target.removeEventListener('progress', handleProgress)
    e.target.removeEventListener('fileload', handleFileLoaed)
    e.target.removeEventListener('complete', handleComplete)
  }
}

const handleComplete = async (e: any) => {
  await Util.wait(300) // progressのduration待機

  bus.emit(LOADING_DONE, {
    done: performance.now() - state.clock,
  })

  e.target.removeEventListener('progress', handleProgress)
  e.target.removeEventListener('fileload', handleFileLoaed)
  e.target.removeEventListener('complete', handleComplete)
}

const loadQueue = new createjs.LoadQueue(true)
loadQueue.setMaxConnections(6)
loadQueue.addEventListener('progress', handleProgress)
loadQueue.addEventListener('fileload', handleFileLoaed)
loadQueue.addEventListener('complete', handleComplete)

const loader = {
  loadStart: (now: number, manifest: Manifest) => {
    state.clock = now
    loadQueue.loadManifest(manifest)
  },

  callLoadedFile: (id: string) => {
    return loadQueue.getResult(id)
  },
}

Object.freeze(loader)

export { loader }
