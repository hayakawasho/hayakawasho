import { onDestroy } from 'svelte'

const defaultOptions = {
  root: null,
  rootMargin: '0px',
}

export function useIntersectionWatch(
  fn: () => void,
  options = {
    once: false,
  }
) {
  const io = new IntersectionObserver(fn, {
    ...defaultOptions,
  })

  onDestroy(() => {
    io.disconnect()
  })

  return {
    observe: () => {
      //
    },
  }
}
