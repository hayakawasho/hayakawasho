export type SpringConfig = {
  stiffness: number; // 剛性
  damping: number; // 減衰
  mass: number; // 質量
};

export const createSpring = (start = 0, { stiffness = 0.1, damping = 0.8, mass = 1 }: Partial<SpringConfig>) => {
  const state = {
    current: start,
    old: start,
    target: start,
  };

  const tween = (deltaRetio = 1) => {
    const velocity = state.current - state.old;
    const diff = state.target - state.current;
    const acceleration = (diff * stiffness - velocity * damping) / mass;

    state.current += (velocity + acceleration) * deltaRetio;
    const currentRounded = Math.round(state.current * 100) / 100;
    state.old = state.current;

    return currentRounded;
  };

  const set = (val: number) => {
    state.target = val;
  };

  const sync = (val: number) => {
    state.current = state.old = state.target = val;
  };

  const reset = () => {
    sync(0);
  };

  return {
    tween,
    set,
    reset,
    sync,
  };
};
