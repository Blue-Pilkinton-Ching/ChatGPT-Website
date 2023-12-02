import { useEffect, useState, useRef } from 'react'

export function useTriggerRender() {
  const [renderTrigger, setRenderTrigger] = useState(0)
  const sideEffectsRef = useRef<() => void>()

  useEffect(() => {
    // Run the side effects if it's a function.
    if (typeof sideEffectsRef.current === 'function') {
      sideEffectsRef.current()
    }
  }, [renderTrigger])

  const obj = {
    triggerNextRender: (sideEffects: () => void) => {
      // Store the sideEffects function in the ref.
      sideEffectsRef.current = sideEffects
      // Trigger the re-render.
      setRenderTrigger((prev) => prev + 1)
    },
  }
  return obj
}
