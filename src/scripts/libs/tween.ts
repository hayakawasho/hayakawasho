import { Tween24, Ease24, Sort24 } from 'tween24'

Tween24.skipHello()

const TWEEN = Tween24

const EASE = {
  cubicOut: Ease24._3_CubicOut,
  cubicInOut: Ease24._3_CubicInOut,
  cubicIn: Ease24._3_CubicIn,
  expoOut: Ease24._6_ExpoOut,
}

const SORT = {
  reverse: Sort24._Reverse,
}

export { TWEEN, EASE, SORT }
