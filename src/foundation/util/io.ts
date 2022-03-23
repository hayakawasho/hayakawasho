type PropsType = {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number[];
};

const defaultOptions: PropsType = {
  root: null,
  rootMargin: "0px",
  threshold: [0, 1],
};

const callback = (entry: IntersectionObserverEntry, { cb }: any) => {
  return entry ? cb(entry) : false;
};

const createIO = (options = defaultOptions) => {
  const handlers = new Set();

  const iObserver = new IntersectionObserver(([entry]) => {
    handlers.forEach((handler) => callback(entry, handler));
  }, options);

  return {
    observe(el: HTMLElement, cb: (e: IntersectionObserverEntry) => unknown) {
      const handler = { el, cb };

      handlers.add(handler);
      iObserver.observe(el);

      return {
        remove() {
          handlers.delete(handler);
          iObserver.unobserve(el);
        },
      };
    },

    destroy() {
      handlers.clear();
      iObserver.disconnect();
    },
  };
};

export { createIO };
