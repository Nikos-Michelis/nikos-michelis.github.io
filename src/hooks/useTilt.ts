import type { PointerEvent } from "react"
import { useMotionValue, useSpring, useTransform } from "motion/react"

type TiltOptions = {
  /** max rotation in degrees */
  max?: number
  stiffness?: number
  damping?: number
}

/**
 * 3D tilt that follows the pointer.
 * Spread `handlers` on a motion element and put `rotateX`/`rotateY` in its style.
 */
export function useTilt({ max = 10, stiffness = 250, damping = 20 }: TiltOptions = {}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness, damping })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness, damping })

  const handlers = {
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      x.set((e.clientX - rect.left) / rect.width - 0.5)
      y.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    onPointerLeave: () => {
      x.set(0)
      y.set(0)
    },
  }

  return { rotateX, rotateY, handlers }
}
