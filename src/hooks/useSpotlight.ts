import type { PointerEvent } from "react"
import { useMotionTemplate, useMotionValue } from "motion/react"

const HIDDEN = -1000

/** Radial light that follows the pointer inside an element. */
export function useSpotlight(radius = 320, color = "hsl(265 38% 89% / 0.12)") {
  const x = useMotionValue(HIDDEN)
  const y = useMotionValue(HIDDEN)
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 70%)`

  const handlers = {
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    },
    onPointerLeave: () => {
      x.set(HIDDEN)
      y.set(HIDDEN)
    },
  }

  return { background, handlers }
}
