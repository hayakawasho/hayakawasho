import { useEffect, useRef } from 'react'
import type { EffectCallback } from 'react'

const noop = () => {}

export function useMount(cb: EffectCallback) {
  const didLogRef = useRef(false)

  useEffect(() => {
    if (didLogRef.current === true) {
      return
    }

    didLogRef.current = true

    const dispose = cb() || noop

    return () => {
      dispose()
    }
  })
}
