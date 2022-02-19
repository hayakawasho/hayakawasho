import Highway from '@dogstudio/highway'
import { gsap, eventbus } from 'lib'
import { PJAX_ENTER, PJAX_LEAVE } from 'const'

class Fade extends Highway.Transition {
  in({ from, to, done }: any) {
    from.remove()
    done()

    gsap.to(to, {
      ease: 'power1',
      duration: 0.35,
      autoAlpha: 1,
    })
  }

  out({ from, done }: any) {
    gsap.to(from, {
      ease: 'power1',
      duration: 0.35,
      autoAlpha: 0,
      onComplete: () => done(),
    })
  }
}

const H = new Highway.Core({
  transitions: {
    default: Fade,
  },
})

H.on('NAVIGATE_OUT', ({ from }: any) => {
  eventbus.emit(PJAX_LEAVE, {
    from: from.view,
  })
})

H.on('NAVIGATE_IN', ({ to }: any) => {
  eventbus.emit(PJAX_ENTER, {
    to: to.view,
  })
})

export { H }
