export type SpringConfig = {
  stiffness: number; // 剛性
  damping: number; // 減衰
  mass: number; // 質量
};

export class SpringTween {
  #current: number;
  #old: number;
  #target: number;
  #stiffness: number;
  #damping: number;
  #mass: number;

  constructor(start = 0, { stiffness = 0.1, damping = 0.8, mass = 1 }: Partial<SpringConfig>) {
    this.#current = this.#old = this.#target = start;
    this.#stiffness = stiffness;
    this.#damping = damping;
    this.#mass = mass;
  }

  tween = (deltaRetio: number = 1) => {
    const velocity = this.#current - this.#old;
    const diff = this.#target - this.#current;
    const acceleration = (diff * this.#stiffness - velocity * this.#damping) / this.#mass;

    this.#old = this.#current;
    this.#current += (velocity + acceleration) * deltaRetio;
    const currentRounded = Math.round(this.#current * 100) / 100;

    return currentRounded;
  };

  set = (val: number) => {
    this.#target = val;
  };

  sync = (val: number) => {
    this.#current = this.#old = this.#target = val;
  };
}
