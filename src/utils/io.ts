const defaults = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 1],
}

const callback = (entry: IntersectionObserverEntry, { cb }: any) => {
  return entry ? cb(entry) : false
}

const createIObserver = (opts = defaults) => {
  const handlers = new Set()
  const io = new IntersectionObserver(([entry]) => {
    handlers.forEach(handler => callback(entry, handler))
  }, opts)

  const observe = (
    el: HTMLElement,
    cb: (e: IntersectionObserverEntry) => unknown
  ) => {
    const handler = {
      el,
      cb,
    }

    handlers.add(handler)
    io.observe(el)

    return {
      remove() {
        handlers.delete(handler)
        io.unobserve(el)
      },
    }
  }

  const destroy = () => {
    handlers.clear()
    io.disconnect()
  }

  return {
    observe,
    destroy,
  }
}

export { createIObserver }
