import { gsap, Linear, Quad, Cubic, Quart, Quint, Expo } from 'gsap'

const EASE = {
  'expo.in': Expo.easeIn,
  'expo.inOut': Expo.easeInOut,
  'expo.out': Expo.easeOut,
  linear: Linear.easeNone,
  'power1.in': Quad.easeIn,
  'power1.inOut': Quad.easeInOut,
  'power1.out': Quad.easeOut,
  'power2.in': Cubic.easeIn,
  'power2.inOut': Cubic.easeInOut,
  'power2.out': Cubic.easeOut,
  'power3.in': Quart.easeIn,
  'power3.inOut': Quart.easeInOut,
  'power3.out': Quart.easeOut,
  'power4.in': Quint.easeIn,
  'power4.inOut': Quint.easeInOut,
  'power4.out': Quint.easeOut,
} as const

type Tweens = (gsap.core.Tween | gsap.core.Timeline)[]

class Tween {
  static serial(...tweens: Tweens) {
    const tl = gsap.timeline()
    tweens.forEach(tween => tl.add(tween))

    return tl
  }

  static parallel(...tweens: Tweens) {
    return gsap.timeline().add(tweens)
  }

  static tween(
    targets: gsap.TweenTarget,
    duration: number,
    ease: keyof typeof EASE | undefined = 'power1.out',
    vars: Omit<gsap.TweenVars, 'duration' | 'ease'>
  ) {
    return gsap.to(targets, {
      ...vars,
      duration,
      ease: EASE[ease],
    })
  }

  static prop(targets: gsap.TweenTarget, vars: gsap.TweenVars) {
    return gsap.set(targets, vars)
  }

  static wait(time: number, onComplete?: gsap.TweenVars['onComplete']) {
    return gsap.to(
      {
        val: 0,
      },
      {
        duration: time,
        onComplete,
        val: 1,
      }
    )
  }

  static immediate(callback: gsap.Callback) {
    return gsap.delayedCall(0, callback)
  }

  static kill(targets: gsap.TweenTarget, properties?: string | object) {
    gsap.killTweensOf(targets, properties)
  }
}

export { Tween }
