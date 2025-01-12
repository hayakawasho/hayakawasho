import NormalizeWheel from "normalize-wheel";
import { createSpring } from "./spring";
import { createEmitter } from "../../_utils/emitter";
import type { SpringConfig } from "./spring";

export class Smoother {
  protected state;
  protected scroll;
  protected emitter;
  protected spring;

  public off;
  public on;

  constructor({ stiffness, damping, mass }: Partial<SpringConfig>) {
    this.state = {
      active: false,
      scrollLimit: 0,
      scrolling: false,
      pointerDown: false,
    };

    this.scroll = {
      current: 0,
      target: 0,
      diff: 0,
      downPos: 0,
      prevPos: 0,
    };

    this.emitter = createEmitter<{ currentY: number }>();

    this.on = this.emitter.on;
    this.off = this.emitter.off;

    this.spring = createSpring(0, {
      stiffness,
      damping,
      mass,
    });
  }

  resize = (contentH: number, windowH: number) => {
    this.state.scrollLimit = contentH - windowH;
    this.scroll.current = this.scroll.target;
  };

  pause = () => {
    this.state.active = false;
  };

  resume = () => {
    this.state.active = true;
  };

  #clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  raf = ({ deltaRatio }: { deltaRatio: number }) => {
    if (!this.state.active) {
      return;
    }

    const diff = this.scroll.target - this.scroll.current;
    this.state.scrolling = Math.abs(diff) >= 0.05;
    this.scroll.diff = diff;

    if (this.state.scrolling) {
      this.scroll.current = this.spring.tween(deltaRatio);

      this.emitter.emit({
        currentY: this.scroll.current,
      });
    }
  };

  onTouchstart = (e: TouchEvent) => {
    if (!this.state.active) {
      return;
    }

    this.state.pointerDown = true;
    this.scroll.downPos = this.scroll.prevPos = e.changedTouches[0].pageY;
  };

  onTouchend = (_e: TouchEvent) => {
    if (!this.state.pointerDown) {
      this.state.pointerDown = false;
      this.scroll.downPos = this.scroll.prevPos = 0;
    }
  };

  onTouchmove = (e: TouchEvent) => {
    if (!this.state.pointerDown || !this.state.active) {
      return;
    }

    this.scroll.prevPos = this.scroll.downPos;
    this.scroll.downPos = e.changedTouches[0].pageY;
    const dist = (this.scroll.prevPos - this.scroll.downPos) * 1;

    this.scroll.target += dist;
    this.scroll.target = this.#clamp(this.scroll.target, -0, this.state.scrollLimit);
    this.spring.set(this.scroll.target);
  };

  onWheel = (e: WheelEvent) => {
    if (!this.state.active) {
      return;
    }

    e.preventDefault();
    const { pixelY } = NormalizeWheel(e);

    this.scroll.target += pixelY;
    this.scroll.target = this.#clamp(this.scroll.target, -0, this.state.scrollLimit);
    this.spring.set(this.scroll.target);
  };

  onNativeScroll = () => {
    if (!this.state.scrolling) {
      this.scroll.target = this.scroll.current = window.scrollY;
    }
  };

  set = (val: number) => {
    this.scroll.target = this.scroll.current = val;
    this.spring.sync(val);
  };

  reset = () => {
    this.set(0);
  };

  scrollOffset = () => {
    return this.scroll.current;
  };
}
