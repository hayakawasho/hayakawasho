declare module '*.vert' {
  const src: string
  export default src
}

declare module '*.frag' {
  const src: string
  export default src
}

declare module '*.glsl' {
  const src: string
  export default src
}

// First, let TypeScript allow all module names starting with "https://". This will suppress TS errors.
declare module 'https://*'

// Second, list out all your dependencies. For every URL, you must map it to its local module.

declare module 'modularload'
