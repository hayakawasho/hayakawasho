// import { instanceOf, match } from 'ts-pattern'
//
// export const unknown2Err = (theUnknown: unknown): Error =>
//   match<unknown, Error>(theUnknown)
//     .with(instanceOf(Error), _ => _ as Error)
//     .otherwise(_ => new Error(`Unknown Error: ${_}`))
