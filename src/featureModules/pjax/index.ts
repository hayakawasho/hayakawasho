import Highway from '@dogstudio/highway'
import { PJAX_ENTER, PJAX_LEAVE } from '@/const'
import { TWEEN, Ease, bus } from '@/lib'

class Fade extends Highway.Transition {
  in({ from, to, done }: any) {
    from.remove()
    done()

    TWEEN.tween(to, 0.35, Ease._2_QuadOut).opacity(1).play()
  }

  out({ from, done }: any) {
    TWEEN.tween(from, 0.35, Ease._2_QuadOut)
      .opacity(0)
      .onComplete(() => done())
      .play()
  }
}

const H = new Highway.Core({
  transitions: {
    default: Fade,
  },
})

H.on('NAVIGATE_OUT', ({ from }: any) => {
  bus.emit(PJAX_LEAVE, {
    from: from.view,
  })
})

H.on('NAVIGATE_IN', ({ to }: any) => {
  bus.emit(PJAX_ENTER, {
    to: to.view,
  })
})

export { H }
