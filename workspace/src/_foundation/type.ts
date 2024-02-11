import type { ReadonlyRef } from 'lake';
import type GlContext from '~/_features/gl';
import type ScrollContext from '~/_features/scroll-tween-container';

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<'push' | 'pop'>;
  backCanvasContext: ReturnType<(typeof GlContext)['setup']>;
  frontCanvasContext: ReturnType<(typeof GlContext)['setup']>;
  scrollContext: ReturnType<(typeof ScrollContext)['setup']>;
};

export type RouteName = 'home' | 'works' | 'single' | 'archives';

//----------------------------------------------------------------

export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};
