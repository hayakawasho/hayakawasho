import { useEffect, useRef } from 'react'
import type { EffectCallback } from 'react'

export function useMount(cb: EffectCallback) {
  const didLogRef = useRef(false)

  useEffect(() => {
    if (didLogRef.current === true) {
      return
    }

    didLogRef.current = true

    cb()
  })
}
