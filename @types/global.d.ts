// First, let TypeScript allow all module names starting with "https://". This will suppress TS errors.
declare module 'https://*'

// Second, list out all your dependencies. For every URL, you must map it to its local module.
declare module 'https://cdn.skypack.dev/pin/gsap@v3.9.0-V6xusepdSv0ZKWTqA3ie/mode=imports,min/optimized/gsap.js' {
  export * from 'gsap'
}

declare module '@dogstudio/highway'
declare module 'modujs'
