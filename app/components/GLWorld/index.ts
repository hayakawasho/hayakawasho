import * as PIXI from 'pixi.js'

class World extends PIXI.Application {}

export function createGl(el: HTMLCanvasElement) {
  new World({
    view: el,
    useContextAlpha: false,
    resolution: Math.min(window.devicePixelRatio, 1.5),
    resizeTo: window,
  })
}
