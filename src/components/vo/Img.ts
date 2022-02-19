import { ValueObject } from './_Vo'

export class Img extends ValueObject<{
  src: string
  width: number
  height: number
}> {}
