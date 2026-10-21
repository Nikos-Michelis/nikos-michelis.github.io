import { useEffect, useState } from "react"
import { animate } from "motion/react"

/** Animates a number from 0 to `target` once `start` becomes true. */
export function useCountUp(target: number, start: boolean, duration = 1.4) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    const controls = animate(0, target, { duration, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [target, start, duration])

  return value
}
