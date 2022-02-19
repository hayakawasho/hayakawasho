import { gsap, eventbus } from '@/lib'
import type { IManifestProps } from '@/manifest'
import { LOADING_PROGRESS, LOADING_TIMEOUT, LOADING_DONE } from 'const'
import { Utils } from 'utils'

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
  gsap.killTweensOf(state.progress)
  gsap.to(state.progress, {
    duration: 0.3,
    now: (e.progress as number) * 100,
    onUpdate: () => {
      if (state.progress.now <= state.progress.before) {
        return
      }

      const progress = Math.round(state.progress.now)
      state.progress.before = progress

      eventbus.emit(LOADING_PROGRESS, { progress })
    },
  })
}

const handleFileLoaed = (e: any) => {
  const elapsedTime = performance.now() - state.clock

  if (elapsedTime > TIMEOUT && !state.isTimeOuted) {
    state.isTimeOuted = true

    eventbus.emit(LOADING_TIMEOUT, {
      id: e.item.id,
      timeout: elapsedTime,
    })

    e.target.removeEventListener('progress', handleProgress)
    e.target.removeEventListener('fileload', handleFileLoaed)
    e.target.removeEventListener('complete', handleComplete)
  }
}

const handleComplete = async (e: any) => {
  await Utils.wait(300) // progressのduration待機

  eventbus.emit(LOADING_DONE, {
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

const loadingManager = {
  loadStart: (now: number, manifest: IManifestProps[]) => {
    state.clock = now
    loadQueue.loadManifest(manifest)
  },

  callLoadedFile: (id: string) => {
    return loadQueue.getResult(id)
  },
}

Object.freeze(loadingManager)

export { loadingManager }
