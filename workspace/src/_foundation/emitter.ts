type EventHandler<T> = (value: T) => any;

export const createEmitter = <T>() => {
  const set = new Set<EventHandler<T>>();
  return {
    emit: (value: T) => set.forEach(handler => handler(value)),
    on: (handler: EventHandler<T>) => {
      set.add(handler);
    },
    off: (handler: EventHandler<T>) => {
      set.delete(handler);
    },
  };
};
